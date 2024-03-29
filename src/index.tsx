import { h, render } from 'preact';
/** @jsx h */

import { List } from 'immutable';
import { some, none } from 'fp-ts/Option';
import * as model from './model';
import { shortcutText } from './model';
import { App } from './app';

import './style.scss';

// default value for a menu item
const D = {
  selected: false, shortcut: none, active: true, submenu: none, tick: false
};

const BUTTON_MENU_STRIP: model.ButtonMenuStrip = {
  active: false,
  buttonMenus: List([
    {
      button: { text: shortcutText('File') },
      menuVisible: false,
      menu: {
        items: List([
          { ...D, text: shortcutText('New'), shortcut: some('Ctrl+N') },
          { ...D, text: shortcutText('Open...'), shortcut: some('Ctrl+O') },
          { ...D, text: shortcutText('Save'), shortcut: some('Ctrl+S') },
          { ...D, text: shortcutText('Save As...', 5) },
          'Separator',
          { ...D, text: shortcutText('Print Preview', 9) },
          { ...D, text: shortcutText('Page Setup...', 7) },
          { ...D, text: shortcutText('Print...'), shortcut: some('Ctrl+P') },
          'Separator',
          { ...D, text: shortcutText('Set As Wallpaper (Tiled)', 7) },
          { ...D, text: shortcutText('Set As Wallpaper (Centered)', 9) },
          'Separator',
          { ...D, text: shortcutText('Recent File'), active: false },
          'Separator',
          { ...D, text: shortcutText('Exit', 1), shortcut: some('Alt+F4') },
        ]),
      },
    },
    {
      button: { text: shortcutText('Edit') },
      menuVisible: false,
      menu: {
        items: List([
          { ...D, text: shortcutText('Undo'), shortcut: some('Ctrl+Z') },
          { ...D, text: shortcutText('Repeat'), shortcut: some('F4') },
          'Separator',
          { ...D, text: shortcutText('Cut', 2), shortcut: some('Ctrl+X') },
          { ...D, text: shortcutText('Copy'), shortcut: some('Ctrl+C') },
          { ...D, text: shortcutText('Paste'), shortcut: some('Ctrl+V') },
          { ...D, text: shortcutText('Clear Selection', 1), shortcut: some('Del') },
          { ...D, text: shortcutText('Select All', 7), shortcut: some('Ctrl+L') },
          'Separator',
          { ...D, text: shortcutText('Copy To...', 1) },
          { ...D, text: shortcutText('Paste From...', 6) },
        ]),
      },
    },
    {
      button: { text: shortcutText('View') },
      menuVisible: false,
      menu: {
        items: List([
          {
            ...D, text: shortcutText('Tool Box'), tick: true, shortcut: some('Ctrl+T')
          },
          {
            ...D, text: shortcutText('Color Box'), tick: true, shortcut: some('Ctrl+A')
          },
          { ...D, text: shortcutText('Status Bar'), tick: true },
          'Separator',
          {
            ...D,
            text: shortcutText('Zoom'),
            submenu: some({
              items: List([
                { ...D, text: shortcutText('Normal Size'), shortcut: some('Ctrl+PgUp') },
                { ...D, text: shortcutText('Large Size'), shortcut: some('Ctrl+PgDn') },
                { ...D, text: shortcutText('Custom...', 1) },
                'Separator',
                { ...D, text: shortcutText('Show Grid', 5), shortcut: some('Ctrl+G') },
                { ...D, text: shortcutText('Show Thumbnail', 6), check: true },
              ])
            })
          },
          { ...D, text: shortcutText('View Bitmap'), shortcut: some('Ctrl+F') },
          {
            ...D, text: shortcutText('Text Toolbar'), check: true, active: false
          },
        ]),
      },
    },
    {
      button: { text: shortcutText('Image') },
      menuVisible: false,
      menu: {
        items: List([
          { ...D, text: shortcutText('Flip/Rotate...'), shortcut: some('Ctrl+R') },
          { ...D, text: shortcutText('Stretch/Skew...'), shortcut: some('Ctrl+W') },
          { ...D, text: shortcutText('Invert Colors'), shortcut: some('Ctrl+I') },
          { ...D, text: shortcutText('Attributes...'), shortcut: some('Ctrl+E') },
          { ...D, text: shortcutText('Clear Image'), shortcut: some('Ctrl+Shift+N') },
        ]),
      },
    },
    {
      button: { text: shortcutText('Options') },
      menuVisible: false,
      menu: {
        items: List([
          { ...D, text: shortcutText('Edit Colors...') },
          { ...D, text: shortcutText('Get Colors...') },
          { ...D, text: shortcutText('Save Colors...') },
          { ...D, text: shortcutText('Draw Opaque') },
        ]),
      },
    },
    {
      button: { text: shortcutText('Help') },
      menuVisible: false,
      menu: {
        items: List([
          { ...D, text: shortcutText('Help Topics') },
          'Separator',
          { ...D, text: shortcutText('About Paint') },
        ]),
      },
    },
  ])
};

const LEFT_PANEL: model.LeftPanel = {
  buttons: List([
    { imageClass: 'icon_Free-Form_Select', state: 'Deselected', tool: 'FreeFormSelect' },
    { imageClass: 'icon_Select', state: 'Deselected', tool: 'Select' },
    { imageClass: 'icon_Eraser', state: 'Deselected', tool: 'Eraser' },
    { imageClass: 'icon_Fill_With_Color', state: 'Deselected', tool: 'FillWithColor' },
    { imageClass: 'icon_Color_Picker', state: 'Deselected', tool: 'ColorPicker' },
    { imageClass: 'icon_Magnifier', state: 'Deselected', tool: 'Magnifier' },
    { imageClass: 'icon_Pencil', state: 'Deselected', tool: 'Pencil' },
    { imageClass: 'icon_Brush', state: 'Deselected', tool: 'Brush' },
    { imageClass: 'icon_Airbrush', state: 'Deselected', tool: 'Airbrush' },
    { imageClass: 'icon_Text', state: 'Deselected', tool: 'Text' },
    { imageClass: 'icon_Line', state: 'Deselected', tool: 'Line' },
    { imageClass: 'icon_Curve', state: 'Deselected', tool: 'Curve' },
    { imageClass: 'icon_Rectangle', state: 'Deselected', tool: 'Rectangle' },
    { imageClass: 'icon_Polygon', state: 'Deselected', tool: 'Polygon' },
    { imageClass: 'icon_Ellipse', state: 'Deselected', tool: 'Ellipse' },
    { imageClass: 'icon_Rounded_Rectangle', state: 'Deselected', tool: 'RoundedRectangle' },
  ]),
};

const COLOR_PICKER: model.ColorPicker = {
  fg: '#000000',
  bg: '#ffffff',
  palette: List([
    '#000000',
    '#808080',
    '#800000',
    '#808000',
    '#008000',
    '#008080',
    '#000080',
    '#800080',
    '#808040',
    '#004040',
    '#0080ff',
    '#004080',
    '#4000ff',
    '#804000',
    '#ffffff',
    '#c0c0c0',
    '#ff0000',
    '#ffff00',
    '#00ff00',
    '#00ffff',
    '#0000ff',
    '#ff00ff',
    '#ffff80',
    '#00ff80',
    '#80ffff',
    '#8080ff',
    '#ff0080',
    '#ff8040',
  ]),
};

const ROOT_STATE_DEFAULT = {
  buttonMenuStrip: BUTTON_MENU_STRIP,
  leftPanel: LEFT_PANEL,
  colorPicker: COLOR_PICKER,
};

const rootElement = document.getElementById('root');

if (rootElement === null) {
  throw new Error('missing root element');
}

render(
  <App initialState={ROOT_STATE_DEFAULT} />,
  rootElement,
);
