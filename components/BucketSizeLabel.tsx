import * as React from 'react';
import { Text, View } from 'react-native';
import { SizeUnits, VolumeUnits, BucketSize } from '../globalState';
import { pluralizeSizes, pluralizeVolumes } from './volumeUtil';
import { Tabs, Tab } from './Tabs';
import { ValidatedSizeForm } from './ValidatedSizeForm';
import { ValidatedVolumeForm } from './ValidatedVolumeForm';

/**
 * Renders a BucketSize so that it is human readable
 */

type BucketSizeProps = {
  bucketSize?: BucketSize;
  editable?: boolean;
  onChange?: (bucketSize: BucketSize) => void;
};

export const BucketSizeLabel: React.FC<BucketSizeProps> = ({
  onChange,
  editable = false,
  bucketSize: { volume, lwh } = {}
}) => editable ? (
  <Tabs defaultKey="volume">
    <Tab title="Volume" id="volume">
      <ValidatedVolumeForm onChange={onChange} />
    </Tab>
    <Tab title="Size" id="size">
      <ValidatedSizeForm onChange={onChange} />
    </Tab>
  </Tabs>
) : volume || lwh ? (
  <View>
    {volume ? <Text>{volume.total} {pluralizeVolumes(volume.unit)}</Text>: null}
    {lwh ? <Text>{lwh.length} x {lwh.width} x {lwh.height} {pluralizeSizes(lwh.unit)}</Text>: null}
  </View>
) : null;

