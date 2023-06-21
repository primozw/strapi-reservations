import React, {useState} from 'react';
import { useIntl } from 'react-intl';

import { 
  Button, 
  Flex,
  Box,
  Dialog, 
  DialogBody,
  DialogFooter,
  Stack,
  Typography
} from '@strapi/design-system';

import { ExclamationMarkCircle, Check } from '@strapi/icons'
import { useCMEditViewDataManager, useNotification, useAppInfos, useTracking } from '@strapi/helper-plugin'

import api from './../../api'

const ReservationsButtons = () => {

  const [confirmModal, setConfirmModal] = useState(false)
  const [cancelModal, setCancelModal] = useState(null)

  const { formatMessage } = useIntl();
  const cmeProps = useCMEditViewDataManager();
  const { slug, initialData, modifiedData } = cmeProps
  const toggleNotification = useNotification();

  const confirmHandler = () => {
    setConfirmModal(true)
  }
  
  const cancelHandler =  () => {
    setCancelModal(true)
  }


  const submitHandler = async ( action ) => {

    if (action === 'confirm') {
      
      setConfirmModal(false)
      const { data } = await api.confirmReservation(modifiedData)

      if ( data.status === 'confirmed') {
        return toggleNotification({
          type: 'success',
          message: formatMessage({
            id: 'strapi-reservations.reservations.editView.modal.confirmation.successMessage',
            defaultMessage: 'Reservation confirmed'
          }),
        });
      } else {
        return toggleNotification({
          type: 'warning',
          message: formatMessage({
            id: 'strapi-reservations.reservations.editView.modal.confirmation.errorMessag',
            defaultMessage: 'Ups. Something went wrong. Please try again later or notify administrator.'
          }),
        });
      }
   
    } else {
      setCancelModal(false)
      const { data } = await api.cancelReservation(modifiedData)

      if ( data.status === 'draft') {
        return toggleNotification({
          type: 'success',
          message: formatMessage({
            id: 'strapi-reservations.reservations.editView.modal.cancelation.successMessage',
            defaultMessage: 'Reservation was successfully canceled.'
          }),
        });
      } else {
        return toggleNotification({
          type: 'warning',
          message: formatMessage({
            id: 'strapi-reservations.reservations.editView.modal.cancelation.errorMessage',
            defaultMessage: 'Ups. Something went wrong. Please try again later or notify administrator.'
          }),
        });
      }

    }
  }

  if (slug !== 'plugin::strapi-reservations.reservation') return null

  return (
    <>
      <Box marginBottom={4} marginTop={4}>
        <Flex
          gap={2}
          direction={'column'}
        >
          <Button onClick={confirmHandler} fullWidth size="L" variant='primary'>{formatMessage({
            id: 'strapi-reservations.reservations.editView.rightLinks.confirmationBtn',
            defaultMessage: 'Confirm Reservation'
          })}</Button>
          <Button onClick={cancelHandler} fullWidth size="L" variant='secondary'>{formatMessage({
            id: 'strapi-reservations.reservations.editView.rightLinks.cancelationBtn',
            defaultMessage: 'Cancel Reservation'
          })}</Button>
        </Flex>
      </Box>

      {/* Confirmation Modal */}
      <Dialog 
        onClose={() => setConfirmModal(false)} 
        title={
          formatMessage({
            id: 'strapi-reservations.reservations.editView.modal.confirmation.title',
            defaultMessage: 'Confirmation'
          })
        }
        isOpen={confirmModal}
      >
        <DialogBody icon={<ExclamationMarkCircle />}>
          <Stack spacing={2}>
            <Flex justifyContent="center">
              <Typography textAlign="center" id="confirm-description">
                {formatMessage({
                  id: 'strapi-reservations.reservations.editView.modal.confirmation.message',
                  defaultMessage: 'Are you sure you want to confirm reservation?'
                })}
              </Typography>
            </Flex>
          </Stack>
        </DialogBody>
        <DialogFooter 
          startAction={
            <Button onClick={() => setConfirmModal(false)} variant="tertiary">
                {formatMessage({
                  id: 'strapi-reservations.reservations.editView.modal.confirmation.cancel',
                  defaultMessage: 'Cancel'
                })}
            </Button>} 
          endAction={
            <Button onClick={() => submitHandler('confirm')} variant="default" startIcon={<Check />}>
              {formatMessage({
                id: 'strapi-reservations.reservations.editView.modal.confirmation.submit',
                defaultMessage: 'Confirm'
              })}
            </Button>} 
          />
      </Dialog>

      {/* Cancelation Modal */}
      <Dialog 
        onClose={() => setCancelModal(false)} 
        title={
          formatMessage({
            id: 'strapi-reservations.reservations.editView.modal.cancelation.title',
            defaultMessage: 'Cancelation'
          })
        }
        isOpen={cancelModal}
      >
        <DialogBody icon={<ExclamationMarkCircle />}>
          <Stack spacing={2}>
            <Flex justifyContent="center">
              <Typography textAlign="center" id="confirm-description">
                {formatMessage({
                  id: 'strapi-reservations.reservations.editView.modal.cancelation.message',
                  defaultMessage: 'Are you sure you want to confirm reservation?'
                })}
              </Typography>
            </Flex>
          </Stack>
        </DialogBody>
        <DialogFooter 
          startAction={
            <Button onClick={() => setCancelModal(false)} variant="tertiary">
                {formatMessage({
                  id: 'strapi-reservations.reservations.editView.modal.cancelation.cancel',
                  defaultMessage: 'Cancel'
                })}
            </Button>} 
          endAction={
            <Button onClick={() => submitHandler('cancel')} variant="default" startIcon={<Check />}>
              {formatMessage({
                id: 'strapi-reservations.reservations.editView.modal.cancelation.submit',
                defaultMessage: 'Confirm'
              })}
            </Button>} 
          />
      </Dialog>
    </>
    
  )
}

export default ReservationsButtons