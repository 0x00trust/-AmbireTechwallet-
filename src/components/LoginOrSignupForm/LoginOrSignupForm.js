import { useState, useRef } from 'react'
import accountPresets from 'ambire-common/src/constants/accountPresets'
import { Checkbox, Button } from 'components/common'
import styles from './LoginOrSignupForm.module.scss'

export default function LoginOrSignupForm({ action = 'LOGIN', onAccRequest, inProgress }) {
  const passConfirmInput = useRef(null)
  const [state, setState] = useState({
    email: '',
    passphrase: '',
    passphraseConfirm: '',
    action
  })
  const onSubmit = (e) => {
    e.preventDefault()
    onAccRequest({
      action: state.action,
      accType: 'QUICK',
      email: state.email,
      passphrase: state.passphrase,
      backupOptout: state.backupOptout
    })
  }
  const onUpdate = (updates) => {
    const newState = { ...state, ...updates }
    setState(newState)
    const shouldValidate = newState.action === 'SIGNUP'
    const invalid = shouldValidate && newState.passphrase !== newState.passphraseConfirm
    // @TODO translation string
    if (passConfirmInput.current) {
      passConfirmInput.current.setCustomValidity(invalid ? 'Passwords must match' : '')
    }
  }
  const minPwdLen = 8
  const isSignup = state.action === 'SIGNUP'
  const days = Math.ceil(accountPresets.quickAccTimelock / 86400)
  const noBackupDisclaimer = `In case you forget your password or lose your backup, you will have to wait ${days} days and pay the recovery fee to restore access to your account.`
  const additionalOnSignup = state.backupOptout ? (
    <Checkbox label={noBackupDisclaimer} required />
  ) : null
  const Link = ({ href, children }) => (
    <a href={href} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
      {children}
    </a>
  )
  const additionalInputs = isSignup ? (
    <>
      <input
        type="password"
        required
        minLength={minPwdLen}
        placeholder="Password"
        value={state.passphrase}
        onChange={(e) => onUpdate({ passphrase: e.target.value })}
      />
      <input
        ref={passConfirmInput}
        required
        minLength={minPwdLen}
        type="password"
        placeholder="Confirm password"
        value={state.passphraseConfirm}
        onChange={(e) => onUpdate({ passphraseConfirm: e.target.value })}
      />
      <Checkbox
        labelClassName={styles.checkboxLabel}
        label={
          <>
            I agree to the{' '}
            <Link href="https://www.ambire.com/Ambire%20ToS%20and%20PP%20(26%20November%202021).pdf">
              Terms of Service and Privacy policy
            </Link>
            .
          </>
        }
        required
      />
      <Checkbox
        labelClassName={styles.checkboxLabel}
        label={
          <>
            Backup on{' '}
            <Link href="https://help.ambire.com/hc/en-us/articles/4410892186002-What-is-Ambire-Cloud-">
              Ambire Cloud
            </Link>
            .
          </>
        }
        checked={!state.backupOptout}
        onChange={(e) => onUpdate({ backupOptout: !e.target.checked })}
      />
      {additionalOnSignup}
    </>
  ) : null

  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        required
        placeholder="Email"
        value={state.email}
        onChange={(e) => onUpdate({ email: e.target.value })}
      />
      {
        // Trick the password manager into putting in the email
        !isSignup ? <input type="password" style={{ display: 'none' }} /> : null
      }
      {additionalInputs}
      <Button
        className={styles.button}
        variant="primaryGradient"
        type="submit"
        loading={inProgress}
        loadingText={isSignup ? 'Signing up...' : 'Logging in...'}
      >
        {isSignup ? 'Sign Up' : 'Log In'}
      </Button>
    </form>
  )
}
