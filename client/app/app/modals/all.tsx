'use client'
import { AppStores } from 'lib/zustand'
import React from 'react'
import Modal from '.'
import CryptoModal from './Crypto'

export default function AllModals() {
  const store = AppStores.useSettings()
  return (
    <>
      {store.showCryptoModal && (
        <Modal
          onBlankClick={() => {
            store.update({ showCryptoModal: false })
          }}
        >
          <CryptoModal />
        </Modal>
      )}

      {store.showTweetsModal && (
        <Modal
          onBlankClick={() => {
            store.update({ showTweetsModal: false })
          }}
        >
          Crypto Modal
        </Modal>
      )}

      {store.showMotivationModal && (
        <Modal
          onBlankClick={() => {
            store.update({ showMotivationModal: false })
          }}
        >
          Crypto Modal
        </Modal>
      )}
    </>
  )
}
