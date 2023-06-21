import * as React from 'react';
import {
  AppointmentModel,
  AppointmentMeta,
  Resource,
  Palette
} from '@devexpress/dx-react-scheduler';

// -------------------------------------------------------------------------------------------------
// AllDayPanel
// -------------------------------------------------------------------------------------------------

import {
  AllDayPanel as AllDayPanelBase,
} from '@devexpress/dx-react-scheduler';


export namespace AllDayPanel {
  /** Describes a cell data configuration object. */
  export type CellData = AllDayPanelBase.CellData;
}

export namespace AllDayPanel {
  /** Describes properties passed to a component that renders an All Day panel layout. */
  export type LayoutProps = AllDayPanelBase.LayoutProps;
}

export namespace AllDayPanel {
  /** Describes properties passed to a component that renders an All Day panel cell. */
  export type CellProps = AllDayPanelBase.CellProps;
}

export namespace AllDayPanel {
  /** Describes properties passed to a component that renders an All Day panel row. */
  export type RowProps = AllDayPanelBase.RowProps;
}

export namespace AllDayPanel {
  /** Describes properties passed to a component that renders a title cell. */
  export type TitleCellProps = AllDayPanelBase.TitleCellProps;
}

export namespace AllDayPanel {
  /** Describes properties passed to a component that renders the appointment layer. */
  export type AppointmentLayerProps = AllDayPanelBase.AppointmentLayerProps;
}

export namespace AllDayPanel {
  /** Describes properties passed to a component that renders an All Day panel container. */
  export type ContainerProps = AllDayPanelBase.ContainerProps;
}

export interface AllDayPanelProps {
  /** A component that renders an All Day panel layout. */
  layoutComponent?: React.ComponentType<AllDayPanelBase.LayoutProps>;
  /** A component that renders an All Day panel cell. */
  cellComponent?: React.ComponentType<AllDayPanelBase.CellProps>;
  /** A component that renders an All Day panel row. */
  rowComponent?: React.ComponentType<AllDayPanelBase.RowProps>;
  /** A component that renders a title cell. */
  titleCellComponent?: React.ComponentType<AllDayPanelBase.TitleCellProps>;
  /** A component that renders the appointment layer. */
  appointmentLayerComponent?: React.ComponentType<AllDayPanelBase.AppointmentLayerProps>;
  /** A component that renders an All Day panel container. */
  containerComponent?: React.ComponentType<AllDayPanelBase.ContainerProps>;
  /** An object that specifies localization messages. */
  messages?: AllDayPanelBase.LocalizationMessages;
}

/** A plugin that renders the All Day Panel. */
export declare const AllDayPanel: React.ComponentType<AllDayPanelProps> & {
  /** A component that renders an All Day panel layout. */
  Layout: React.ComponentType<AllDayPanelBase.LayoutProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders an All Day panel cell. */
  Cell: React.ComponentType<AllDayPanelBase.CellProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders an All Day panel row. */
  Row: React.ComponentType<AllDayPanelBase.RowProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a title cell. */
  TitleCell: React.ComponentType<AllDayPanelBase.TitleCellProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders the appointment layer. */
  AppointmentLayer: React.ComponentType<AllDayPanelBase.AppointmentLayerProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders an All Day panel container. */
  Container: React.ComponentType<AllDayPanelBase.ContainerProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
};

// -------------------------------------------------------------------------------------------------
// AppointmentForm
// -------------------------------------------------------------------------------------------------

import {
  AppointmentForm as AppointmentFormBase,
} from '@devexpress/dx-react-scheduler';


export namespace AppointmentForm {
  /** Properties passed to a component that renders the appointment form's overlay. */
  export type OverlayProps = AppointmentFormBase.OverlayProps;
}

export namespace AppointmentForm {
  /** Properties passed to a component that renders the appointment form's layout. */
  export type LayoutProps = AppointmentFormBase.LayoutProps;
}

export namespace AppointmentForm {
  /** Properties passed to a component that renders a layout for command buttons. */
  export type CommandLayoutProps = AppointmentFormBase.CommandLayoutProps;
}

export namespace AppointmentForm {
  /** Properties passed to a component that renders a layout for editors that edit basic appointment data. */
  export type BasicLayoutProps = AppointmentFormBase.BasicLayoutProps;
}

export namespace AppointmentForm {
  /** Properties passed to a component that renders the appointment form's layout for editors that edit the appointment's recurrence. */
  export type RecurrenceLayoutProps = AppointmentFormBase.RecurrenceLayoutProps;
}

export namespace AppointmentForm {
  /** Properties passed to a component that renders a Boolean value editor on the appointment form. */
  export type BooleanEditorProps = AppointmentFormBase.BooleanEditorProps;
}

export namespace AppointmentForm {
  /** Properties passed to a component that renders a command button on the appointment form. */
  export type CommandButtonProps = AppointmentFormBase.CommandButtonProps;
}

export namespace AppointmentForm {
  /** Properties passed to a component that renders a date-time editor on the appointment form. */
  export type DateEditorProps = AppointmentFormBase.DateEditorProps;
}

export namespace AppointmentForm {
  /** Properties passed to a component that renders a text label on the appointment form. */
  export type LabelProps = AppointmentFormBase.LabelProps;
}

export namespace AppointmentForm {
  /** Properties passed to a component that renders a radio group on the appointment form. */
  export type RadioGroupProps = AppointmentFormBase.RadioGroupProps;
}

export namespace AppointmentForm {
  /** Properties passed to a component that renders a menu of options on the appointment form. */
  export type SelectProps = AppointmentFormBase.SelectProps;
}

export namespace AppointmentForm {
  /** Properties passed to a component that renders a resource editor on the appointment form. */
  export type ResourceEditorProps = AppointmentFormBase.ResourceEditorProps;
}

export namespace AppointmentForm {
  /** Properties passed to a component that renders a text editor on the appointment form. */
  export type TextEditorProps = AppointmentFormBase.TextEditorProps;
}

export namespace AppointmentForm {
  /** Properties passed to a component that renders a weekly recurrence selector on the appointment form. */
  export type WeeklyRecurrenceSelectorProps = AppointmentFormBase.WeeklyRecurrenceSelectorProps;
}

export interface AppointmentFormProps {
  /** Specifies the appointment form's visibility. */
  visible?: boolean;
  /** Handles changes to the appointment form's visibility. */
  onVisibilityChange?: (visible: boolean) => void;
  /** Specifies the appointment's data that the form displays. */
  appointmentData?: AppointmentModel;
  /** Handles changes to the appointment's data. */
  onAppointmentDataChange?: (appointmentData: AppointmentModel) => void;
  /** Specifies the appointment form is read-only. */
  readOnly?: boolean;
  /** An object that specifies localization messages. */
  messages?: AppointmentFormBase.LocalizationMessages;
  /** A component that renders the appointment form's overlay. */
  overlayComponent?: React.ComponentType<AppointmentFormBase.OverlayProps>;
  /** A component that renders the appointment form's layout. */
  layoutComponent?: React.ComponentType<AppointmentFormBase.LayoutProps>;
  /** A component that renders a layout for command buttons. */
  commandLayoutComponent?: React.ComponentType<AppointmentFormBase.CommandLayoutProps>;
  /** A component that renders a layout for editors that edit basic appoinement data. */
  basicLayoutComponent?: React.ComponentType<AppointmentFormBase.BasicLayoutProps>;
  /** A component that renders a layout for editors that specify the appointment's recurrence. */
  recurrenceLayoutComponent?: React.ComponentType<AppointmentFormBase.RecurrenceLayoutProps>;
  /** A component that renders a command button. */
  commandButtonComponent?: React.ComponentType<AppointmentFormBase.CommandButtonProps>;
  /** A component that renders a text editor. */
  textEditorComponent?: React.ComponentType<AppointmentFormBase.TextEditorProps>;
  /** A component that renders a date-time editor. */
  dateEditorComponent?: React.ComponentType<AppointmentFormBase.DateEditorProps>;
  /** A component that renders a text label. */
  labelComponent?: React.ComponentType<AppointmentFormBase.LabelProps>;
  /** A component that renders an editor of Boolean values. */
  booleanEditorComponent?: React.ComponentType<AppointmentFormBase.BooleanEditorProps>;
  /** A component that renders an options menu. */
  selectComponent?: React.ComponentType<AppointmentFormBase.SelectProps>;
  /** A component that renders a radio group. */
  radioGroupComponent?: React.ComponentType<AppointmentFormBase.RadioGroupProps>;
  /** A component that renders a resource editor. */
  resourceEditorComponent?: React.ComponentType<AppointmentFormBase.ResourceEditorProps>;
  /** A component that renders a weekly recurrence selector. */
  weeklyRecurrenceSelectorComponent?: React.ComponentType<AppointmentFormBase.WeeklyRecurrenceSelectorProps>;
}

/** The AppointmentForm plugin renders a form that visualizes appointment's data and allows a user to modify this data. */
export declare const AppointmentForm: React.ComponentType<AppointmentFormProps> & {
  /** A component that renders the appointment form's overlay. */
  Overlay: React.ComponentType<AppointmentFormBase.OverlayProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders the appointment form's layout. */
  Layout: React.ComponentType<AppointmentFormBase.LayoutProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a layout for command buttons. */
  CommandLayout: React.ComponentType<AppointmentFormBase.CommandLayoutProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a layout for editors that edit basic appointment data. */
  BasicLayout: React.ComponentType<AppointmentFormBase.BasicLayoutProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a layout for editors that specify the appointment's recurrence. */
  RecurrenceLayout: React.ComponentType<AppointmentFormBase.RecurrenceLayoutProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a text editor. */
  TextEditor: React.ComponentType<AppointmentFormBase.TextEditorProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a date-time editor. */
  DateEditor: React.ComponentType<AppointmentFormBase.DateEditorProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a text label. */
  Label: React.ComponentType<AppointmentFormBase.LabelProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a Boolean value editor. */
  BooleanEditor: React.ComponentType<AppointmentFormBase.BooleanEditorProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders an options menu. */
  Select: React.ComponentType<AppointmentFormBase.SelectProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a radio group. */
  RadioGroup: React.ComponentType<AppointmentFormBase.RadioGroupProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a weekly recurrence selector. */
  WeeklyRecurrenceSelector: React.ComponentType<AppointmentFormBase.WeeklyRecurrenceSelectorProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
};

// -------------------------------------------------------------------------------------------------
// AppointmentTooltip
// -------------------------------------------------------------------------------------------------

import {
  AppointmentTooltip as AppointmentTooltipBase,
} from '@devexpress/dx-react-scheduler';


export namespace AppointmentTooltip {
  /** Describes properties passed to a component that renders a tooltip layout. */
  export type LayoutProps = AppointmentTooltipBase.LayoutProps;
}

export namespace AppointmentTooltip {
  /** Describes properties passed to a component that renders the tooltip header. */
  export type HeaderProps = AppointmentTooltipBase.HeaderProps;
}

export namespace AppointmentTooltip {
  /** Describes properties passed to a component that renders the tooltip content. */
  export type ContentProps = AppointmentTooltipBase.ContentProps;
}

export namespace AppointmentTooltip {
  /** Describes properties passed to a component that renders a command button. */
  export type CommandButtonProps = AppointmentTooltipBase.CommandButtonProps;
}

export interface AppointmentTooltipProps {
  /** Specifies the Open button's visibility. */
  showOpenButton?: boolean;
  /** Specifies the Close button's visibility. */
  showCloseButton?: boolean;
  /** Specifies the Delete button's visibility. */
  showDeleteButton?: boolean;
  /** Specifies the tooltip's visibility. */
  visible?: boolean;
  /** The appointment's displayed metadata. */
  appointmentMeta?: AppointmentMeta;
  /** Handles the tooltip's visibility chages. */
  onVisibilityChange?: (visible: boolean) => void;
  /** Handles the meta data changes. */
  onAppointmentMetaChange?: (appointmentMeta: AppointmentMeta) => void;
  /** A component that renders the tooltip layout. */
  layoutComponent?: React.ComponentType<AppointmentTooltipBase.LayoutProps>;
  /** A component that renders the header. */
  headerComponent?: React.ComponentType<AppointmentTooltipBase.HeaderProps>;
  /** A component that renders the tooltip content. */
  contentComponent?: React.ComponentType<AppointmentTooltipBase.ContentProps>;
  /** A component that renders a command button. */
  commandButtonComponent?: React.ComponentType<AppointmentTooltipBase.CommandButtonProps>;
  /** A component that renders an icon that indicates a recurring appointment. */
  recurringIconComponent?: React.ComponentType<object>;
}

/** The `AppointmentTooltip` plugin allows you to display information about an appointment in a tooltip. */
export declare const AppointmentTooltip: React.ComponentType<AppointmentTooltipProps> & {
  /** A component that renders the tooltip layout. */
  Layout: React.ComponentType<AppointmentTooltipBase.LayoutProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders the tooltip header. */
  Header: React.ComponentType<AppointmentTooltipBase.HeaderProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders the tooltip content. */
  Content: React.ComponentType<AppointmentTooltipBase.ContentProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a command button. */
  CommandButton: React.ComponentType<AppointmentTooltipBase.CommandButtonProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
};

// -------------------------------------------------------------------------------------------------
// Appointments
// -------------------------------------------------------------------------------------------------

import {
  Appointments as AppointmentsBase,
} from '@devexpress/dx-react-scheduler';


export namespace Appointments {
  /** Properties passed to a component that renders an appointment. */
  export type AppointmentProps = AppointmentsBase.AppointmentProps;
}

export namespace Appointments {
  /** Properties passed to a component that renders the appointment content. */
  export type AppointmentContentProps = AppointmentsBase.AppointmentContentProps;
}

export namespace Appointments {
  /** Properties passed to a component that renders an element which indicates the appointment is divided. */
  export type SplitIndicatorProps = AppointmentsBase.SplitIndicatorProps;
}

export namespace Appointments {
  /** Properties passed to a component that renders a container for the appointment. */
  export type ContainerProps = AppointmentsBase.ContainerProps;
}

export interface AppointmentsProps {
  /** A component that renders an appointment. */
  appointmentComponent?: React.ComponentType<AppointmentsBase.AppointmentProps>;
  /** A component that renders the appointment content. */
  appointmentContentComponent?: React.ComponentType<AppointmentsBase.AppointmentContentProps>;
  /** A component that renders an element which indicates the appointment is divided. */
  splitIndicatorComponent?: React.ComponentType<AppointmentsBase.SplitIndicatorProps>;
  /** A component that renders an icon for recurring appointments. */
  recurringIconComponent?: React.ComponentType<object>;
  /** A component that renders a container for the appointment. */
  containerComponent?: React.ComponentType<AppointmentsBase.ContainerProps>;
}

/** A plugin that renders appointments. */
export declare const Appointments: React.ComponentType<AppointmentsProps> & {
  /** A component that renders an appointment. */
  Appointment: React.ComponentType<AppointmentsBase.AppointmentProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders the appointment content. */
  AppointmentContent: React.ComponentType<AppointmentsBase.AppointmentContentProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders an element which indicates the appointment is divided. */
  SplitIndicator: React.ComponentType<AppointmentsBase.SplitIndicatorProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a container for the appointment. */
  Container: React.ComponentType<AppointmentsBase.ContainerProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
};

// -------------------------------------------------------------------------------------------------
// ConfirmationDialog
// -------------------------------------------------------------------------------------------------

import {
  ConfirmationDialog as ConfirmationDialogBase,
} from '@devexpress/dx-react-scheduler';


export namespace ConfirmationDialog {
  /** Properties passed to a component that renders the dialog's layout. */
  export type LayoutProps = ConfirmationDialogBase.LayoutProps;
}

export namespace ConfirmationDialog {
  /** Properties passed to a component that renders the overlay window. */
  export type OverlayProps = ConfirmationDialogBase.OverlayProps;
}

export namespace ConfirmationDialog {
  /** Properties passed to a component that renders the dialog's buttons. */
  export type ButtonProps = ConfirmationDialogBase.ButtonProps;
}

export interface ConfirmationDialogProps {
  /** Specifies whether to open the dialog when a user attempts to delete an appointment. */
  ignoreDelete?: boolean;
  /** Specifies whether to open the dialog when a user attempts to discard edits made to an appointment. */
  ignoreCancel?: boolean;
  /** A component that renders the dialog's layout. */
  layoutComponent?: React.ComponentType<ConfirmationDialogBase.LayoutProps>;
  /** A component that renders the overlay window. */
  overlayComponent?: React.ComponentType<ConfirmationDialogBase.OverlayProps>;
  /** A component that renders the dialog's buttons. */
  buttonComponent?: React.ComponentType<ConfirmationDialogBase.ButtonProps>;
  /** An object that contains localized messages. */
  messages?: ConfirmationDialogBase.LocalizationMessages;
}

/** A plugin that renders a dialog that prompts a user to confirm that an appointment should be deleted or changes to an appointment should be discarded. */
export declare const ConfirmationDialog: React.ComponentType<ConfirmationDialogProps> & {
  /** A component that renders the dialog's layout. */
  Layout: React.ComponentType<ConfirmationDialogBase.LayoutProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders the overlay window. */
  Overlay: React.ComponentType<ConfirmationDialogBase.OverlayProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders the dialog's buttons. */
  Button: React.ComponentType<ConfirmationDialogBase.ButtonProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
};

// -------------------------------------------------------------------------------------------------
// CurrentTimeIndicator
// -------------------------------------------------------------------------------------------------

import {
  CurrentTimeIndicator as CurrentTimeIndicatorBase,
} from '@devexpress/dx-react-scheduler';


export namespace CurrentTimeIndicator {
  /** Properties passed to the `indicatorComponent`. */
  export type IndicatorProps = CurrentTimeIndicatorBase.IndicatorProps;
}

export interface CurrentTimeIndicatorProps {
  /** An interval in milliseconds that specifies how frequently the indicator's position is updated. */
  updateInterval?: number;
  /** Specifies whether previous appointments should be shaded. */
  shadePreviousAppointments?: boolean;
  /** Specifies whether previous cells should be shaded. */
  shadePreviousCells?: boolean;
  /** A component that renders the current time indicator. */
  indicatorComponent?: React.ComponentType<CurrentTimeIndicatorBase.IndicatorProps>;
}

/** A plugin that renders the current time indicator and the shading that covers appointments and timetable cells up to the current time. */
export declare const CurrentTimeIndicator: React.ComponentType<CurrentTimeIndicatorProps> & {
  /** A component that renders the current time indicator. */
  Indicator: React.ComponentType<CurrentTimeIndicatorBase.IndicatorProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
};

// -------------------------------------------------------------------------------------------------
// DateNavigator
// -------------------------------------------------------------------------------------------------

import {
  DateNavigator as DateNavigatorBase,
} from '@devexpress/dx-react-scheduler';


export namespace DateNavigator {
  /** Properties passed to a component that renders the date navigator's root element. */
  export type RootProps = DateNavigatorBase.RootProps;
}

export namespace DateNavigator {
  /** Properties passed to a component that renders the date navigator's overlay element. */
  export type OverlayProps = DateNavigatorBase.OverlayProps;
}

export namespace DateNavigator {
  /** Properties passed to a component that renders the date navigator's open button. */
  export type OpenButtonProps = DateNavigatorBase.OpenButtonProps;
}

export namespace DateNavigator {
  /** Properties passed to a component that renders the date navigator's navigation button. */
  export type NavigationButtonProps = DateNavigatorBase.NavigationButtonProps;
}

export interface DateNavigatorProps {
  /** A component that renders the date navigator's root element. */
  rootComponent?: React.ComponentType<DateNavigatorBase.RootProps>;
  /** A component that renders the date navigator's overlay element. */
  overlayComponent?: React.ComponentType<DateNavigatorBase.OverlayProps>;
  /** A component that renders a button that invokes the date navigator. */
  openButtonComponent?: React.ComponentType<DateNavigatorBase.OpenButtonProps>;
  /** A component that renders the date navigator's navigation buttons. */
  navigationButtonComponent?: React.ComponentType<DateNavigatorBase.NavigationButtonProps>;
}

/** A plugin that renders the Scheduler's date navigator. */
export declare const DateNavigator: React.ComponentType<DateNavigatorProps> & {
  /** A component that renders the date navigator's root element. */
  Root: React.ComponentType<DateNavigatorBase.RootProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders the date navigator's overlay element. */
  Overlay: React.ComponentType<DateNavigatorBase.OverlayProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a button that invokes the date navigator. */
  OpenButton: React.ComponentType<DateNavigatorBase.OpenButtonProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders the date navigator's navigation buttons. */
  NavigationButton: React.ComponentType<DateNavigatorBase.NavigationButtonProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
};

// -------------------------------------------------------------------------------------------------
// DayView
// -------------------------------------------------------------------------------------------------

import {
  DayView as DayViewBase,
} from '@devexpress/dx-react-scheduler';


export namespace DayView {
  /** Describes a cell data configuration object. */
  export type CellData = DayViewBase.CellData;
}

export namespace DayView {
  /** Describes properties passed to a component that renders a day view layout. */
  export type LayoutProps = DayViewBase.LayoutProps;
}

export namespace DayView {
  /** Describes properties passed to a component that renders a time scale layout. */
  export type TimeScaleLayoutProps = DayViewBase.TimeScaleLayoutProps;
}

export namespace DayView {
  /** Describes properties passed to a component that renders a time scale label. */
  export type TimeScaleLabelProps = DayViewBase.TimeScaleLabelProps;
}

export namespace DayView {
  /** Describes properties passed to a component that renders a time scale tick. */
  export type TimeScaleTickCellProps = DayViewBase.TimeScaleTickCellProps;
}

export namespace DayView {
  /** Describes properties passed to a component that renders a day scale layout. */
  export type DayScaleLayoutProps = DayViewBase.DayScaleLayoutProps;
}

export namespace DayView {
  /** Describes properties passed to a component that renders a day scale cell. */
  export type DayScaleCellProps = DayViewBase.DayScaleCellProps;
}

export namespace DayView {
  /** Describes properties passed to a component that renders a day scale empty cell. */
  export type DayScaleEmptyCellProps = DayViewBase.DayScaleEmptyCellProps;
}

export namespace DayView {
  /** Describes properties passed to a component that renders a timetable layout. */
  export type TimeTableLayoutProps = DayViewBase.TimeTableLayoutProps;
}

export namespace DayView {
  /** Describes properties passed to a component that renders a timetable cell. */
  export type TimeTableCellProps = DayViewBase.TimeTableCellProps;
}

export namespace DayView {
  /** Describes properties passed to a component that renders the appointment layer. */
  export type AppointmentLayerProps = DayViewBase.AppointmentLayerProps;
}

export namespace DayView {
  /** Describes properties passed to a component that renders a day view row. */
  export type RowProps = DayViewBase.RowProps;
}

export interface DayViewProps {
  /** The view's unique identifier. Required if you use several `DayView` plugins. */
  name?: string;
  /** The view's name used in UI plugins. The default value is `name`. */
  displayName?: string;
  /** Multiplies the default view interval. */
  intervalCount?: number;
  /** Specifies the cell's duration in minutes. */
  cellDuration?: number;
  /** Specifies the start hour of the view time scale. Accepts floating-point numbers from 0 to 24. */
  startDayHour?: number;
  /** Specifies the end hour of the view time scale. Accepts floating-point numbers from 0 to 24. */
  endDayHour?: number;
  /** A component that renders a day view layout. */
  layoutComponent?: React.ComponentType<DayViewBase.LayoutProps>;
  /** A component that renders a time scale layout. */
  timeScaleLayoutComponent?: React.ComponentType<DayViewBase.TimeScaleLayoutProps>;
  /** A component that renders a time scale label. */
  timeScaleLabelComponent?: React.ComponentType<DayViewBase.TimeScaleLabelProps>;
  /** A component that renders a time scale tick. */
  timeScaleTickCellComponent?: React.ComponentType<DayViewBase.TimeScaleTickCellProps>;
  /** A component that renders a day scale layout. */
  dayScaleLayoutComponent?: React.ComponentType<DayViewBase.DayScaleLayoutProps>;
  /** A component that renders a day scale cell. */
  dayScaleCellComponent?: React.ComponentType<DayViewBase.DayScaleCellProps>;
  /** A component that renders a day scale row. */
  dayScaleRowComponent?: React.ComponentType<DayViewBase.RowProps>;
  /** A component that renders a day scale empty cell. */
  dayScaleEmptyCellComponent?: React.ComponentType<DayViewBase.DayScaleEmptyCellProps>;
  /** A component that renders a timetable layout. */
  timeTableLayoutComponent?: React.ComponentType<DayViewBase.TimeTableLayoutProps>;
  /** A component that renders a timetable cell. */
  timeTableCellComponent?: React.ComponentType<DayViewBase.TimeTableCellProps>;
  /** A component that renders a timetable row. */
  timeTableRowComponent?: React.ComponentType<DayViewBase.RowProps>;
  /** A component that renders the appointment layer. */
  appointmentLayerComponent?: React.ComponentType<DayViewBase.AppointmentLayerProps>;
}

/** A plugin that renders Scheduler data for a day. This plugin arranges appointments from top to bottom. If their time intervals overlap, their width is decreased and they are placed next to each other. */
export declare const DayView: React.ComponentType<DayViewProps> & {
  /** A component that renders a day view layout. */
  Layout: React.ComponentType<DayViewBase.LayoutProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a time scale layout. */
  TimeScaleLayout: React.ComponentType<DayViewBase.TimeScaleLayoutProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a time scale label. */
  TimeScaleLabel: React.ComponentType<DayViewBase.TimeScaleLabelProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a time scale tick. */
  TimeScaleTickCell: React.ComponentType<DayViewBase.TimeScaleTickCellProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a day scale layout. */
  DayScaleLayout: React.ComponentType<DayViewBase.DayScaleLayoutProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a day scale cell. */
  DayScaleCell: React.ComponentType<DayViewBase.DayScaleCellProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a day scale row. */
  DayScaleRow: React.ComponentType<DayViewBase.RowProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a day scale empty cell. */
  DayScaleEmptyCell: React.ComponentType<DayViewBase.DayScaleEmptyCellProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a timetable layout. */
  TimeTableLayout: React.ComponentType<DayViewBase.TimeTableLayoutProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a timetable cell. */
  TimeTableCell: React.ComponentType<DayViewBase.TimeTableCellProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a timetable row. */
  TimeTableRow: React.ComponentType<DayViewBase.RowProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders the appointment layer. */
  AppointmentLayer: React.ComponentType<DayViewBase.AppointmentLayerProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
};

// -------------------------------------------------------------------------------------------------
// DragDropProvider
// -------------------------------------------------------------------------------------------------

import {
  DragDropProvider as DragDropProviderBase,
} from '@devexpress/dx-react-scheduler';


export namespace DragDropProvider {
  /** Describes properties of the component that renders the appointment being dragged. */
  export type DraftAppointmentProps = DragDropProviderBase.DraftAppointmentProps;
}

export namespace DragDropProvider {
  /** Describes properties of the component that renders a copy of the appointment being dragged in its previous location. */
  export type SourceAppointmentProps = DragDropProviderBase.SourceAppointmentProps;
}

export namespace DragDropProvider {
  /** Describes properties of the component that renders a handle used to resize the appointment. */
  export type ResizeProps = DragDropProviderBase.ResizeProps;
}

export namespace DragDropProvider {
  /** Describes properties of the component that renders a container for the appointment being dragged. */
  export type ContainerProps = DragDropProviderBase.ContainerProps;
}

export interface DragDropProviderProps {
  /** A function that specifies draggable appointments. */
  allowDrag?: (appointmentData: AppointmentModel) => boolean;
  /** A function that specifies resizable appointments. */
  allowResize?: (appointmentData: AppointmentModel) => boolean;
  /** Specifies the scroll speed when an appointment is resized or dragged and dropped. */
  scrollSpeed?: number;
  /** A component that renders the appointment being dragged. */
  draftAppointmentComponent?: React.ComponentType<DragDropProviderBase.DraftAppointmentProps>;
  /** A component that renders a copy of the appointment being dragged in its previous location. */
  sourceAppointmentComponent?: React.ComponentType<DragDropProviderBase.SourceAppointmentProps>;
  /** A component that renders a handle used to resize the appointment. */
  resizeComponent?: React.ComponentType<DragDropProviderBase.ResizeProps>;
  /** A component that renders a container for the appointment being dragged. */
  containerComponent?: React.ComponentType<DragDropProviderBase.ContainerProps>;
}

/** A plugin that enables users to edit appointments via drag-and-drop. */
export declare const DragDropProvider: React.ComponentType<DragDropProviderProps> & {
  /** A component that renders the appointment being dragged. */
  DraftAppointment: React.ComponentType<DragDropProviderBase.DraftAppointmentProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a copy of the appointment being dragged in its previous location. */
  SourceAppointment: React.ComponentType<DragDropProviderBase.SourceAppointmentProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders the handle of the appointment being resized. */
  Resize: React.ComponentType<DragDropProviderBase.ResizeProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a container for the appointment being dragged. */
  Container: React.ComponentType<DragDropProviderBase.ContainerProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
};

// -------------------------------------------------------------------------------------------------
// EditRecurrenceMenu
// -------------------------------------------------------------------------------------------------

import {
  EditRecurrenceMenu as EditRecurrenceMenuBase,
} from '@devexpress/dx-react-scheduler';


export namespace EditRecurrenceMenu {
  /** Properties passed to a component that renders the edit menu's layout. */
  export type LayoutProps = EditRecurrenceMenuBase.LayoutProps;
}

export namespace EditRecurrenceMenu {
  /** Properties passed to a component that renders the overlay window. */
  export type OverlayProps = EditRecurrenceMenuBase.OverlayProps;
}

export namespace EditRecurrenceMenu {
  /** Properties passed to a component that renders the OK and Cancel buttons. */
  export type ButtonProps = EditRecurrenceMenuBase.ButtonProps;
}

export interface EditRecurrenceMenuProps {
  /** A component that renders the menu's layout. */
  layoutComponent?: React.ComponentType<EditRecurrenceMenuBase.LayoutProps>;
  /** A component that renders the overlay window. */
  overlayComponent?: React.ComponentType<EditRecurrenceMenuBase.OverlayProps>;
  /** A component that renders the OK and Cancel buttons. */
  buttonComponent?: React.ComponentType<EditRecurrenceMenuBase.ButtonProps>;
  /** An object that contains localized messages. */
  messages?: EditRecurrenceMenuBase.LocalizationMessages;
}

/** A plugin that renders the menu that allows users to edit recurrent appointments. Should not be used with the IntegratedEditing plugin. */
export declare const EditRecurrenceMenu: React.ComponentType<EditRecurrenceMenuProps> & {
  /** A component that renders the edit menu's layout. */
  Layout: React.ComponentType<EditRecurrenceMenuBase.LayoutProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders the overlay window. */
  Overlay: React.ComponentType<EditRecurrenceMenuBase.OverlayProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders the OK and Cancel buttons. */
  Button: React.ComponentType<EditRecurrenceMenuBase.ButtonProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
};

// -------------------------------------------------------------------------------------------------
// GroupingPanel
// -------------------------------------------------------------------------------------------------

import {
  GroupingPanel as GroupingPanelBase,
} from '@devexpress/dx-react-scheduler';


export namespace GroupingPanel {
  /** Describes properties passed to a component that renders the grouping panel horizontally. */
  export type HorizontalLayoutProps = GroupingPanelBase.HorizontalLayoutProps;
}

export namespace GroupingPanel {
  /** Describes properties passed to a component that renders the grouping panel vertically. */
  export type VerticalLayoutProps = GroupingPanelBase.VerticalLayoutProps;
}

export namespace GroupingPanel {
  /** Describes properties passed to a component that renders a row on the grouping panel. */
  export type RowProps = GroupingPanelBase.RowProps;
}

export namespace GroupingPanel {
  /** Describes properties passed to a component that renders a cell in a row on the grouping panel. */
  export type CellProps = GroupingPanelBase.CellProps;
}

export interface GroupingPanelProps {
  /** A component that renders the grouping panel horizontally. */
  horizontalLayoutComponent?: React.ComponentType<GroupingPanelBase.HorizontalLayoutProps>;
  /** A component that renders the grouping panel vertically. */
  verticalLayoutComponent?: React.ComponentType<GroupingPanelBase.HorizontalLayoutProps>;
  /** A component that renders a row on the grouping panel. */
  rowComponent?: React.ComponentType<GroupingPanelBase.RowProps>;
  /** A component that renders a cell in a row on the grouping panel. */
  cellComponent?: React.ComponentType<GroupingPanelBase.CellProps>;
}

/** A plugin that renders the grouping panel used to display group names. */
export declare const GroupingPanel: React.ComponentType<GroupingPanelProps> & {
  /** A component that renders the grouping panel horizontally. */
  HorizontalLayout: React.ComponentType<GroupingPanelBase.HorizontalLayoutProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders the grouping panel vertically. */
  VerticalLayout: React.ComponentType<GroupingPanelBase.VerticalLayoutProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a row on the grouping panel. */
  Row: React.ComponentType<GroupingPanelBase.RowProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a cell in a row on the grouping panel. */
  Cell: React.ComponentType<GroupingPanelBase.CellProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
};

// -------------------------------------------------------------------------------------------------
// MonthView
// -------------------------------------------------------------------------------------------------

import {
  MonthView as MonthViewBase,
} from '@devexpress/dx-react-scheduler';


export namespace MonthView {
  /** Describes a cell data configuration object. */
  export type CellData = MonthViewBase.CellData;
}

export namespace MonthView {
  /** Describes properties passed to a component that renders a month view layout. */
  export type LayoutProps = MonthViewBase.LayoutProps;
}

export namespace MonthView {
  /** Describes properties passed to a component that renders a day scale layout. */
  export type DayScaleLayoutProps = MonthViewBase.DayScaleLayoutProps;
}

export namespace MonthView {
  /** Describes properties passed to a component that renders a day scale cell. */
  export type DayScaleCellProps = MonthViewBase.DayScaleCellProps;
}

export namespace MonthView {
  /** Describes properties passed to a component that renders an empty cell on the day scale. */
  export type DayScaleEmptyCellProps = MonthViewBase.DayScaleEmptyCellProps;
}

export namespace MonthView {
  /** Describes properties passed to a component that renders a timetable layout. */
  export type TimeTableLayoutProps = MonthViewBase.TimeTableLayoutProps;
}

export namespace MonthView {
  /** Describes properties passed to a component that renders a timetable cell. */
  export type TimeTableCellProps = MonthViewBase.TimeTableCellProps;
}

export namespace MonthView {
  /** Describes properties passed to a component that renders the appointment layer. */
  export type AppointmentLayerProps = MonthViewBase.AppointmentLayerProps;
}

export namespace MonthView {
  /** Describes properties passed to a component that renders a row. */
  export type RowProps = MonthViewBase.RowProps;
}

export interface MonthViewProps {
  /** The view's unique identifier. Required if you use several `MonthView` plugins. */
  name?: string;
  /** The view's name used in UI plugins. The default value is equal to `name`. */
  displayName?: string;
  /** Multiplies the default view interval. */
  intervalCount?: number;
  /** A component that renders a month view layout. */
  layoutComponent?: React.ComponentType<MonthViewBase.LayoutProps>;
  /** A component that renders a day scale layout. */
  dayScaleLayoutComponent?: React.ComponentType<MonthViewBase.DayScaleLayoutProps>;
  /** A component that renders a day scale cell. */
  dayScaleCellComponent?: React.ComponentType<MonthViewBase.DayScaleCellProps>;
  /** A component that renders a day scale row. */
  dayScaleRowComponent?: React.ComponentType<MonthViewBase.RowProps>;
  /** A component that renders an empty cell on the day scale. */
  dayScaleEmptyCellComponent?: React.ComponentType<MonthViewBase.DayScaleEmptyCellProps>;
  /** A component that renders a timetable layout. */
  timeTableLayoutComponent?: React.ComponentType<MonthViewBase.TimeTableLayoutProps>;
  /** A component that renders a timetable cell. */
  timeTableCellComponent?: React.ComponentType<MonthViewBase.TimeTableCellProps>;
  /** A component that renders a timetable row. */
  timeTableRowComponent?: React.ComponentType<MonthViewBase.RowProps>;
  /** A component that renders the appointment layer. */
  appointmentLayerComponent?: React.ComponentType<MonthViewBase.AppointmentLayerProps>;
}

/** A plugin that renders Scheduler data for a month. This plugin arranges appointments from left to right. An appointment's size depends on its duration in days. However, it occupies the entire day cell if an appointment lasts only for several hours or minutes. The time scale and all-day panel are not available in this view. */
export declare const MonthView: React.ComponentType<MonthViewProps> & {
  /** A component that renders a month view layout. */
  Layout: React.ComponentType<MonthViewBase.LayoutProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a day scale layout. */
  DayScaleLayout: React.ComponentType<MonthViewBase.DayScaleLayoutProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a day scale cell. */
  DayScaleCell: React.ComponentType<MonthViewBase.DayScaleCellProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a day scale row. */
  DayScaleRow: React.ComponentType<MonthViewBase.RowProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders an empty cell on the day scale. */
  DayScaleEmptyCell: React.ComponentType<MonthViewBase.DayScaleEmptyCellProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a timetable layout. */
  TimeTableLayout: React.ComponentType<MonthViewBase.TimeTableLayoutProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a timetable cell. */
  TimeTableCell: React.ComponentType<MonthViewBase.TimeTableCellProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a timetable row. */
  TimeTableRow: React.ComponentType<MonthViewBase.RowProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders the appointment layer. */
  AppointmentLayer: React.ComponentType<MonthViewBase.AppointmentLayerProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
};

// -------------------------------------------------------------------------------------------------
// Resources
// -------------------------------------------------------------------------------------------------

import {
  Resources as ResourcesBase,
} from '@devexpress/dx-react-scheduler';

export interface ResourcesProps {
  /** Resource data objects. */
  data?: Array<Resource>;
  /** Specifies which of several resources provides colors for appointments. */
  mainResourceName?: string;
  /** A palette used if a resource instance color is not defined. */
  palette?: Palette;
}

/** A plugin that configures resources. */
export declare const Resources: React.ComponentType<ResourcesProps>;

// -------------------------------------------------------------------------------------------------
// Scheduler
// -------------------------------------------------------------------------------------------------

import {
  Scheduler as SchedulerBase,
} from '@devexpress/dx-react-scheduler';


export namespace Scheduler {
  /** Describes properties passed to a component that renders the root layout. */
  export type RootProps = SchedulerBase.RootProps;
}

export interface SchedulerProps {
  /** An array of appointment data objects. */
  data?: Array<AppointmentModel>;
  /** The scheduler's height. If the value is `auto`, the height equals that of the container component. */
  height?: number | `auto`;
  /** The locale according to which dates should be formatted. */
  locale?: string | Array<string>;
  /** A number between 0  and 6  that specifies the first day of the week. */
  firstDayOfWeek?: number;
  /** A component that renders the root layout. */
  rootComponent?: React.ComponentType<SchedulerBase.RootProps>;
  /** A React node used to render the scheduler content. */
  children?: React.ReactNode;
}

/** The Scheduler is a root container component designed to process and display the specified data. The Scheduler's functionality  is implemented in several plugins specified as child components. */
export declare const Scheduler: React.ComponentType<SchedulerProps> & {
  /** A component that renders the root layout. */
  Root: React.ComponentType<SchedulerBase.RootProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
};

// -------------------------------------------------------------------------------------------------
// TodayButton
// -------------------------------------------------------------------------------------------------

import {
  TodayButton as TodayButtonBase,
} from '@devexpress/dx-react-scheduler';


export namespace TodayButton {
  /** Properties passed to the component that renders the today button. */
  export type ButtonProps = TodayButtonBase.ButtonProps;
}

export interface TodayButtonProps {
  /** A component that renders the today button. */
  buttonComponent?: React.ComponentType<TodayButtonBase.ButtonProps>;
  /** An object that specifies localization messages. */
  messages?: TodayButtonBase.LocalizationMessages;
}

/** A plugin that renders the Scheduler's button that is used to navigate to the today's date */
export declare const TodayButton: React.ComponentType<TodayButtonProps> & {
  /** A component that renders the today button. */
  Button: React.ComponentType<TodayButtonBase.ButtonProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
};

// -------------------------------------------------------------------------------------------------
// Toolbar
// -------------------------------------------------------------------------------------------------

import {
  Toolbar as ToolbarBase,
} from '@devexpress/dx-react-scheduler';


export namespace Toolbar {
  /** Describes properties passed to a component that renders the toolbar's root element. */
  export type RootProps = ToolbarBase.RootProps;
}

export namespace Toolbar {
  /** Describes properties passed to a component that renders the the toolbar's empty area. */
  export type FlexibleSpaceProps = ToolbarBase.FlexibleSpaceProps;
}

export interface ToolbarProps {
  /** A component that renders the toolbar's root element. */
  rootComponent?: React.ComponentType<ToolbarBase.RootProps>;
  /** A component that renders the toolbar's empty area. */
  flexibleSpaceComponent?: React.ComponentType<ToolbarBase.FlexibleSpaceProps>;
}

/** A plugin that renders the Scheduler's toolbar. */
export declare const Toolbar: React.ComponentType<ToolbarProps> & {
  /** A component that renders the toolbar's root element. */
  Root: React.ComponentType<ToolbarBase.RootProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders the toolbar's empty area. */
  FlexibleSpace: React.ComponentType<ToolbarBase.FlexibleSpaceProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
};

// -------------------------------------------------------------------------------------------------
// ViewSwitcher
// -------------------------------------------------------------------------------------------------

import {
  ViewSwitcher as ViewSwitcherBase,
} from '@devexpress/dx-react-scheduler';


export namespace ViewSwitcher {
  /** Properties passed to a component that renders the view switcher. */
  export type SwitcherProps = ViewSwitcherBase.SwitcherProps;
}

export interface ViewSwitcherProps {
  /** A component that renders the view switcher. */
  switcherComponent?: React.ComponentType<ViewSwitcherBase.SwitcherProps>;
}

/** A plugin that renders the Scheduler's view switcher. */
export declare const ViewSwitcher: React.ComponentType<ViewSwitcherProps> & {
  /** A component that renders the view switcher. */
  Switcher: React.ComponentType<ViewSwitcherBase.SwitcherProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
};

// -------------------------------------------------------------------------------------------------
// WeekView
// -------------------------------------------------------------------------------------------------

import {
  WeekView as WeekViewBase,
} from '@devexpress/dx-react-scheduler';


export namespace WeekView {
  /** Describes a cell data configuration object. */
  export type CellData = WeekViewBase.CellData;
}

export namespace WeekView {
  /** Describes properties passed to a component that renders a week view layout. */
  export type LayoutProps = WeekViewBase.LayoutProps;
}

export namespace WeekView {
  /** Describes properties passed to a component that renders a time scale layout. */
  export type TimeScaleLayoutProps = WeekViewBase.TimeScaleLayoutProps;
}

export namespace WeekView {
  /** Describes properties passed to a component that renders a time scale label. */
  export type TimeScaleLabelProps = WeekViewBase.TimeScaleLabelProps;
}

export namespace WeekView {
  /** Describes properties passed to a component that renders a time scale tick. */
  export type TimeScaleTickCellProps = WeekViewBase.TimeScaleTickCellProps;
}

export namespace WeekView {
  /** Describes properties passed to a component that renders a day scale layout. */
  export type DayScaleLayoutProps = WeekViewBase.DayScaleLayoutProps;
}

export namespace WeekView {
  /** Describes properties passed to a component that renders a day scale cell. */
  export type DayScaleCellProps = WeekViewBase.DayScaleCellProps;
}

export namespace WeekView {
  /** Describes properties passed to a component that renders a day scale empty cell. */
  export type DayScaleEmptyCellProps = WeekViewBase.DayScaleEmptyCellProps;
}

export namespace WeekView {
  /** Describes properties passed to a component that renders a timetable layout. */
  export type TimeTableLayoutProps = WeekViewBase.TimeTableLayoutProps;
}

export namespace WeekView {
  /** Describes properties passed to a component that renders a timetable cell. */
  export type TimeTableCellProps = WeekViewBase.TimeTableCellProps;
}

export namespace WeekView {
  /** Describes properties passed to a component that renders the appointment layer. */
  export type AppointmentLayerProps = WeekViewBase.AppointmentLayerProps;
}

export namespace WeekView {
  /** Describes properties passed to a component that renders a week view row. */
  export type RowProps = WeekViewBase.RowProps;
}

export interface WeekViewProps {
  /** The view's unique identifier. Required if you use several `WeekView` plugins. */
  name?: string;
  /** The view's name used in UI plugins. The default value is equal to `name`. */
  displayName?: string;
  /** Specifies the days of week that should not be displayed in the view. Accepts an array of zero-based day indexes . */
  excludedDays?: Array<number>;
  /** Multiplies the default view interval. */
  intervalCount?: number;
  /** Specifies the cell's duration in minutes. */
  cellDuration?: number;
  /** Specifies the start hour of the view time scale. Accepts floating-point numbers from 0 to 24. */
  startDayHour?: number;
  /** Specifies the end hour of the view time scale. Accepts floating-point numbers from 0 to 24. */
  endDayHour?: number;
  /** A component that renders a week view layout. */
  layoutComponent?: React.ComponentType<WeekViewBase.LayoutProps>;
  /** A component that renders a time scale layout. */
  timeScaleLayoutComponent?: React.ComponentType<WeekViewBase.TimeScaleLayoutProps>;
  /** A component that renders a time scale label. */
  timeScaleLabelComponent?: React.ComponentType<WeekViewBase.TimeScaleLabelProps>;
  /** A component that renders a time scale tick. */
  timeScaleTickCellComponent?: React.ComponentType<WeekViewBase.TimeScaleTickCellProps>;
  /** A component that renders a day scale layout. */
  dayScaleLayoutComponent?: React.ComponentType<WeekViewBase.DayScaleLayoutProps>;
  /** A component that renders a day scale cell. */
  dayScaleCellComponent?: React.ComponentType<WeekViewBase.DayScaleCellProps>;
  /** A component that renders a day scale row. */
  dayScaleRowComponent?: React.ComponentType<WeekViewBase.RowProps>;
  /** A component that renders a day scale empty cell. */
  dayScaleEmptyCellComponent?: React.ComponentType<WeekViewBase.DayScaleEmptyCellProps>;
  /** A component that renders a timetable layout. */
  timeTableLayoutComponent?: React.ComponentType<WeekViewBase.TimeTableLayoutProps>;
  /** A component that renders a timetable cell. */
  timeTableCellComponent?: React.ComponentType<WeekViewBase.TimeTableCellProps>;
  /** A component that renders a timetable row. */
  timeTableRowComponent?: React.ComponentType<WeekViewBase.RowProps>;
  /** A component that renders an appointment layer. */
  appointmentLayerComponent?: React.ComponentType<WeekViewBase.AppointmentLayerProps>;
}

/** A plugin that renders the Scheduler's week view. This plugin arranges appointments from top to bottom. If their time intervals overlap, their width is decreased and they are placed next to each other. */
export declare const WeekView: React.ComponentType<WeekViewProps> & {
  /** A component that renders a week view layout. */
  Layout: React.ComponentType<WeekViewBase.LayoutProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a time scale layout. */
  TimeScaleLayout: React.ComponentType<WeekViewBase.TimeScaleLayoutProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a time scale label. */
  TimeScaleLabel: React.ComponentType<WeekViewBase.TimeScaleLabelProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a time scale tick. */
  TimeScaleTickCell: React.ComponentType<WeekViewBase.TimeScaleTickCellProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a day scale layout. */
  DayScaleLayout: React.ComponentType<WeekViewBase.DayScaleLayoutProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a day scale cell. */
  DayScaleCell: React.ComponentType<WeekViewBase.DayScaleCellProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a day scale row. */
  DayScaleRow: React.ComponentType<WeekViewBase.RowProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a day scale empty cell. */
  DayScaleEmptyCell: React.ComponentType<WeekViewBase.DayScaleEmptyCellProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a timetable layout. */
  TimeTableLayout: React.ComponentType<WeekViewBase.TimeTableLayoutProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a timetable cell. */
  TimeTableCell: React.ComponentType<WeekViewBase.TimeTableCellProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a timetable row. */
  TimeTableRow: React.ComponentType<WeekViewBase.RowProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders the appointment layer. */
  AppointmentLayer: React.ComponentType<WeekViewBase.AppointmentLayerProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
};
