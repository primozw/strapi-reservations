/* eslint-disable import/no-cycle */
import React from 'react';
import { useIntl } from 'react-intl';
import { Draggable } from 'react-beautiful-dnd';
import {
  Flex,
  Box,
  IconButton,
  Td,
  Typography,
} from '@strapi/design-system';

import { Trash, Drag, Pencil } from '@strapi/icons';

import styled from 'styled-components';

const Row = styled('tr')`
  width: 100%;
  border-bottom: 1px solid #eaeaef;
  ${(props) => (props.isDragging ? `background: ${props.theme.colors.primary100}` : '')};
  ${(props) => (props.isDragging ? `display: table;` : '')};
  & td {
    padding: 16px;
    width: 25%;
  }
`;

const DraggedItem = ({
  index,
  data,
  onClickDelete,
  onClickEdit
}) => {

  const { formatMessage, locale } = useIntl()

  return (
    <Draggable
      draggableId={`schedule-${data.id}`}
      index={index}
    >
      {( provided, snapshot ) => (
        <Row 
          {...provided.draggableProps} 
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <Td>
            <Typography textColor="neutral800">{data.label}</Typography>
          </Td>
          <Td>
            <Typography textColor="neutral800">{new Date(data.start).toLocaleDateString(locale)}</Typography>
          </Td>
          <Td>
            <Typography textColor="neutral800">{new Date(data.end).toLocaleDateString(locale)}</Typography>
          </Td>
          <Td>
            <Flex justifyContent={'flex-end'} gap={2}>
              <IconButton 
                onClick={() => onClickEdit(data.id)} 
                label={formatMessage({
                  id: 'strapi-reservations.settings.schedules.tableRow.editButton',
                  defaultMessage: 'Edit'
                })} 
                noBorder 
                icon={<Pencil />} 
              />
              <Box paddingLeft={1}>
                <IconButton 
                  onClick={() => onClickDelete(data.id)} 
                  label={formatMessage({
                    id: 'strapi-reservations.settings.schedules.tableRow.deleteButton',
                    defaultMessage: 'Delete'
                  })} 
                  noBorder 
                  icon={<Trash />} 
                />
              </Box>
              <IconButton
                {...provided.dragHandleProps}
                label={formatMessage({
                  id: 'strapi-reservations.settings.schedules.tableRow.moveButton',
                  defaultMessage: 'Move'
                })} 
                className="drag-handle"
                forwardedAs="div"
                role="button"
                noBorder
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
              >
                <Drag />
              </IconButton>
            </Flex>
          </Td>
        </Row>
      )}
    </Draggable>
  );
};


export default DraggedItem;


