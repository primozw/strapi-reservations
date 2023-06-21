// admin/src/pages/Settings/index.js
import React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';

import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';
import { Flex } from '@strapi/design-system';

import ColorPickerInput from './../../components/ColorPickerInput'



const Colors = ({settings, handleSettings}) => {

  const { formatMessage } = useIntl();

  return (
    <Box marginBottom={5} marginTop={7}>
      <Box marginBottom={6}>
        <Typography
          as={'h2'}
          variant={'beta'}
        >{formatMessage({
          id: 'strapi-reservations.settings.colors.title',
          defaultMessage: 'Colors'
        })}</Typography>
      </Box>

      <Flex gap={7}>
        <Box>
          <ColorPickerInput
              intlLabel={{ id: 'strapi-reservations.settings.colors.draftColor.label', defaultMessage: 'Draft Color' }}
              onChange= {(e) => handleSettings({prop: 'draftColor', value: e.target.value})}
              name={'settings.colors.draftColor.label'}
              value={settings.draftColor}
          />
        </Box>
        <Box>
          <ColorPickerInput
              intlLabel={{ id: 'strapi-reservations.settings.colors.confirmedColor.label', defaultMessage: 'Confirmed Color' }}
              onChange= {(e) => handleSettings({prop: 'confirmedColor', value: e.target.value})}
              name={'settings.colors.confirmedColor.label'}
              value={settings.confirmedColor}
          />
        </Box>

      </Flex>

    </Box>
  )
};

export default Colors;