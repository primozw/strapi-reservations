// admin/src/pages/Settings/index.js
import React, { useEffect, useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { LoadingIndicatorPage, useNotification, difference } from '@strapi/helper-plugin';
import { 
  Box,
  Button,
  Typography
} from '@strapi/design-system';
import { HeaderLayout } from '@strapi/design-system/Layout';
import { ContentLayout } from '@strapi/design-system/Layout';
import Check from '@strapi/icons/Check';

import api from '../../api';

import Holidays from './Holidays';
import Colors from './Colors';
import Calendar from './Calendar'
import Schedules from '../../components/Schedules';

import { isEmpty } from 'lodash';


const Settings = () => {
  
  const [settings, setSettings] = useState(null);
  const [initSettings, setInitSettings] = useState(null);

  const [isSaving, setIsSaving] = useState(false);

  const toggleNotification = useNotification();

  const { formatMessage } = useIntl();

  useEffect(() => {
    api.getSettings().then(res => {
      setSettings(res.data);
      setInitSettings(res.data);
    });
  }, []);

  useEffect(() => {
    if (settings && initSettings){
      console.log('Settings: ',settings)
      console.log('Init settings: ', initSettings)
      console.log(isEmpty(difference(settings, initSettings)))
    }
  }, [settings, initSettings])

  const handleSubmit = async () => {
    setIsSaving(true);
    const res = await api.setSettings(settings);

    setIsSaving(false);

    if (res.statusText === 'OK') {
      setSettings(res.data);
      setInitSettings(res.data);
      toggleNotification({
        type: 'success',
        message: formatMessage({
          id: 'strapi-reservations.settings.notification.successfulSaved',
          defaultMessage: 'Settings successfully updated.'
        }),
      });
    } else {
      toggleNotification({
        type: 'warning',
        message: formatMessage({
          id: 'strapi-reservations.settings.notification.errorSaving',
          defaultMessage: 'Ups. Error accrued while saving settings.'
        }),
      });
    }
  };

  const handleSettings = ({prop, value}) => {
    setSettings(settings => ({
      ...settings,
      [prop]: value
    }))
  }

  return (
    <>
      <HeaderLayout
        id="title"
        title={formatMessage({
          id: 'strapi-reservations.settings.title',
          defaultMessage: "Reservation Settings",
        })}
        subtitle={formatMessage({
          id: 'strapi-reservations.settings.subtitle',
          defaultMessage: 'Manage the settings and behavior for reservation system'
        })}
        primaryAction={( settings === null ) ? null :
          <Button
            onClick={handleSubmit}
            startIcon={<Check />}
            size="L"
            disabled={isSaving || !settings || !initSettings || isEmpty(difference(settings, initSettings))}
            loading={isSaving}
          >
            Save
          </Button> 
        }
      ></HeaderLayout>
      {( settings === null ) ? (
        <LoadingIndicatorPage />
      ) : (
        <ContentLayout>
          <Box
            background="neutral0"
            hasRadius
            shadow="filterShadow"
            padding={7}
          >
            <Box>
              <Box marginBottom={6}>
                <Box marginBottom={4}>
                  <Typography
                    as={'h2'}
                    variant={'beta'}
                  >
                    <FormattedMessage
                        id={'strapi-reservations.settings.schedules.title'}
                        defaultMessage={'Schedules'}
                      />
                  </Typography>
                </Box>
                <Schedules />
              </Box>
              <Calendar settings={settings} handleSettings={handleSettings} />
              <Holidays settings={settings} handleSettings={handleSettings} />
              <Colors settings={settings} handleSettings={handleSettings} />
            </Box>
          </Box>
        </ContentLayout>
      )}
    </>
  );
};

export default Settings;