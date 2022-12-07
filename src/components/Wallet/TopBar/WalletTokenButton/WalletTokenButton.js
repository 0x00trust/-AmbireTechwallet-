import { useLocalStorage } from 'hooks'
import useDynamicModal from "hooks/useDynamicModals"
import { Button, ToolTip, Loading } from "components/common"
import { WalletTokenModal, CongratsRewardsModal } from "components/Modals"
import useClaimableWalletToken from 'ambire-common/src/hooks/useClaimableWalletToken'
import { useEffect, useState, useCallback } from "react"

import styles from './WalletTokenButton.module.scss'

const WalletTokenButton = ({ rewardsData, accountId, network, hidePrivateValue, addRequest, relayerURL, useRelayerData }) => {
    const { isLoading: rewardsIsLoading, errMsg: rewardsErrMsg, lastUpdated: rewardsLastUpdated } = rewardsData
    const claimableWalletToken = useClaimableWalletToken({
        relayerURL,
        useRelayerData,
        accountId,
        network,
        addRequest,
        totalLifetimeRewards: rewardsData.rewards.totalLifetimeRewards,
        walletUsdPrice: rewardsData.rewards.walletUsdPrice,
        rewardsLastUpdated
      })

    const { currentClaimStatus, pendingTokensTotal, vestingEntry } = claimableWalletToken
    const showWalletTokenModal = useDynamicModal(WalletTokenModal, { claimableWalletToken, accountId, network }, { rewards: rewardsData.rewards })
    const renderRewardsButtonText = useCallback(() => {
        // The rewards value depends on both - the currentClaimStatus and the
        // rewards data. Therefore - require both data sets to be loaded.
        const hasErrorAndNoPrevValues =
          (currentClaimStatus.error || rewardsErrMsg) &&
          (!currentClaimStatus.lastUpdated || !rewardsLastUpdated)
        if (hasErrorAndNoPrevValues) {
          return 'Rewards'
        }

        // Display loading state only if prev data is missing for any of both data sets.
        // For all other cases - display the prev data instead of loading indicator,
        // so that the UI doesn't jump by switching loading indicator on and off.
        const isCurrentClaimStatusLoadingAndNoPrevData =
          currentClaimStatus.loading && !currentClaimStatus.lastUpdated
        const isRewardsDataLoadingAndNoPrevData = rewardsIsLoading && !rewardsLastUpdated
        if (isCurrentClaimStatusLoadingAndNoPrevData || isRewardsDataLoadingAndNoPrevData) {
          return (<span><Loading/></span>)
        }
        
        if (!vestingEntry) {
          return `${hidePrivateValue(pendingTokensTotal)} $WALLET`
        }
        
        if ((currentClaimStatus.claimed === null)
          || (currentClaimStatus.mintableVesting === null)
          || (currentClaimStatus.claimedInitial === null)) {
          return <span><Loading/></span>
        }
    
        return `${hidePrivateValue(pendingTokensTotal)} $WALLET`
    }, [currentClaimStatus, hidePrivateValue, pendingTokensTotal, rewardsErrMsg, rewardsIsLoading, rewardsLastUpdated, vestingEntry])
   
    const [currentCongratsModalState, setCurrentCongratsModalState] = useState(null) 
    const defaultCongratsModalShownState = (currentClaimStatus && (currentClaimStatus.claimed === 0) && (currentClaimStatus.mintableVesting === 0) && (pendingTokensTotal && pendingTokensTotal !== '...' && parseFloat(pendingTokensTotal) === 0) ) ? false : true
    const [congratsModalState, setCongratsModalState] = useLocalStorage({
        key: 'congratsModalState',
        defaultValue: []
    })
    
    useEffect(() => {
        if (congratsModalState.length === 0) setCongratsModalState([{ account: accountId, isCongratsModalShown: defaultCongratsModalShownState }])
        if (congratsModalState.length && !congratsModalState.find(i => i.account === accountId)) {
            setCongratsModalState([...congratsModalState, { account: accountId, isCongratsModalShown: defaultCongratsModalShownState }])
        }
        
        if (congratsModalState.length) {
            const isFound = congratsModalState.find(i => i.account === accountId)
            if (isFound) setCurrentCongratsModalState(isFound)
        }  
    }, [accountId, congratsModalState, defaultCongratsModalShownState, setCongratsModalState])
    
    const handleCongratsRewardsModal = useDynamicModal(CongratsRewardsModal, { pendingTokensTotal })
    const showCongratsRewardsModal = useCallback(() => {
        if (parseFloat(pendingTokensTotal) > 0 && !currentCongratsModalState.isCongratsModalShown) {
            const updated = congratsModalState.map(item => (item.account === accountId) ? 
            { ...item, isCongratsModalShown: true } : item)

            setCongratsModalState(updated)
            handleCongratsRewardsModal()
        }
        
    }, [pendingTokensTotal, currentCongratsModalState, setCongratsModalState, congratsModalState, accountId, handleCongratsRewardsModal])
    
    useEffect(() => showCongratsRewardsModal(), [showCongratsRewardsModal])
    
    return (
        !relayerURL ?
            <ToolTip label="WALLET rewards are not available without a connection to the relayer">
                <Button small border disabled>Rewards</Button>
            </ToolTip>
            :
            <Button
                small
                border
                onClick={showWalletTokenModal}
                className={styles.button}
                style={{ textTransform: 'none'}}
            >
                { renderRewardsButtonText() }  
            </Button>
    )
}

export default WalletTokenButton
