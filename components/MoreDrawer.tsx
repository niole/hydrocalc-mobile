import * as React from 'react';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { MoreButton } from './MoreButton';

export type MoreDrawerOption = {
  label: string;
  action?: () => void;
};

type Props = {
  options: MoreDrawerOption[];
  cancelButtonIndex: number;
  destructiveButtonIndex?: number;
};

export const MoreDrawer: React.FC<Props> = props => {
  const { showActionSheetWithOptions } = useActionSheet();
  return (
    <MoreButton onPress={handleOnPress(showActionSheetWithOptions, props)} />
  );
};

const handleOnPress = (
    showActionSheetWithOptions: (a: any, b: any) => void,
    {
      options,
      cancelButtonIndex,
      destructiveButtonIndex,
    }: Props
) => () => {
  showActionSheetWithOptions(
    { options: options.map(o => o.label), cancelButtonIndex, destructiveButtonIndex },
    (i: number | undefined) => {
      if (i !== undefined && !!options[i].action) {
        options[i].action!();
      }
    }
  );

};
