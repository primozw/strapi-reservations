import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled'
import {
  Stack,
  Typography,
  Flex,
  Box,
  BaseButton,
  FocusTrap,
  Field,
  FieldHint,
  FieldError,
  FieldLabel,
  FieldInput,
  Popover,
} from '@strapi/design-system';
import { CarretDown } from '@strapi/icons';
import { useIntl } from 'react-intl';
import { HexColorPicker } from 'react-colorful';

const ColorPreview = styled.div`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  background-color: ${(props) => props.color};
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const ColorPicker = styled(HexColorPicker)`
  && {
    width: 100%;
    aspect-ratio: 1.5;
  }

  .react-colorful__pointer {
    width: 0.75rem;
    height: 0.75rem;
  }

  .react-colorful__saturation {
    border-radius: 0.25rem;
    border-bottom: none;
  }

  .react-colorful__hue {
    border-radius: 10px;
    height: 0.75rem;
    margin-top: 0.5rem;
  }
`;

const ColorPickerToggle = styled(BaseButton)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    display: none;
  }
`;

const ColorPickerPopover = styled(Popover)`
  padding: 0.5rem;
  min-height: 270px;
`;

const ColorPickerInput = ({
  description,
  disabled,
  error,
  intlLabel,
  labelAction,
  name,
  onChange,
  required,
  value,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerButtonRef = useRef();
  const { formatMessage } = useIntl();
  const color = value || '#000000';
  const styleUppercase = { textTransform: 'uppercase' };

  const handleBlur = (e) => {
    e.preventDefault();

    if (!e.currentTarget.contains(e.relatedTarget)) {
      setShowColorPicker(false);
    }
  };

  return (
    <Field
      name={name}
      id={name}
      // GenericInput calls formatMessage and returns a string for the error
      error={error}
      hint={description && formatMessage(description)}
      required={required}
    >
      <Stack spacing={1}>
        <FieldLabel action={labelAction}>{formatMessage(intlLabel)}</FieldLabel>
        <ColorPickerToggle
          ref={colorPickerButtonRef}
          aria-label={formatMessage({
            id: 'strapi-reservations.color-picker.toggle.aria-label',
            defaultMessage: 'Color picker toggle',
          })}
          aria-controls="color-picker-value"
          aria-haspopup="dialog"
          aria-expanded={showColorPicker}
          aria-disabled={disabled}
          disabled={disabled}
          onClick={() => setShowColorPicker(!showColorPicker)}
        >
          <Flex>
            <ColorPreview color={color} />
            <Typography
              style={styleUppercase}
              textColor={value ? null : 'neutral600'}
              variant="omega"
            >
              {color}
            </Typography>
          </Flex>
          <CarretDown aria-hidden />
        </ColorPickerToggle>
        {showColorPicker && (
          <ColorPickerPopover
            onBlur={handleBlur}
            role="dialog"
            source={colorPickerButtonRef}
            spacing={4}
          >
            <FocusTrap onEscape={() => setShowColorPicker(false)}>
              <ColorPicker
                color={color}
                onChange={(hexValue) =>
                  onChange({ target: { name, value: hexValue } })
                }
              />
              <Flex paddingTop={3} paddingLeft={4} justifyContent="flex-end">
                <Box paddingRight={2}>
                  <Typography variant="omega" as="label" textColor="neutral600">
                    {formatMessage({
                      id: 'strapi-reservations.color-picker.input.format',
                      defaultMessage: 'HEX',
                    })}
                  </Typography>
                </Box>
                <FieldInput
                  id="color-picker-value"
                  aria-label={formatMessage({
                    id: 'strapi-reservations.color-picker.input.aria-label',
                    defaultMessage: 'Color picker input',
                  })}
                  style={styleUppercase}
                  value={value}
                  placeholder="#000000"
                  onChange={onChange}
                />
              </Flex>
            </FocusTrap>
          </ColorPickerPopover>
        )}
        <FieldHint />
        <FieldError />
      </Stack>
    </Field>
  );
};

ColorPickerInput.defaultProps = {
  description: null,
  disabled: false,
  error: null,
  labelAction: null,
  required: false,
  value: '',
};

ColorPickerInput.propTypes = {
  intlLabel: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.object,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  labelAction: PropTypes.object,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default ColorPickerInput;