import * as React from 'react';
import { Text, View } from 'react-native';
import { Volume, LWH, SizeUnits, VolumeUnits, BucketSize } from '../globalState';
import { pluralizeSizes, pluralizeVolumes } from './volumeUtil';
import { Tabs, Tab } from './Tabs';
import { ValidatedSizeForm } from './ValidatedSizeForm';
import { ValidatedVolumeForm } from './ValidatedVolumeForm';
import { Doer } from './Doer';

type BucketWithSize = {
  lwh: LWH;
};

type BucketWithVolume = {
  volume: Volume;
};

/**
 * Renders a BucketSize so that it is human readable
 */

type BucketSizeProps = {
  bucketSize?: BucketSize;
  editable?: boolean;
  onChange?: (bucketSize: BucketSize) => void;
  fontSize?: number;
};

export const BucketSizeLabel: React.FC<BucketSizeProps> = ({
  onChange,
  editable = false,
  bucketSize,
  fontSize,
}) => editable ? (
  <Tabs defaultKey="volume">
    <Tab title="Volume" id="volume">
      <ValidatedVolumeForm onChange={onChange} value={bucketSize} />
    </Tab>
    <Tab title="Size" id="size">
      <ValidatedSizeForm onChange={onChange} value={bucketSize}/>
    </Tab>
  </Tabs>
) : (
<>
  <Doer before={bucketSize} checker={bs => !!bs?.volume}>
    {({ volume }: BucketWithVolume) => <Text style={fontSize ? { fontSize } : undefined}>{volume.total} {pluralizeVolumes(volume.unit)}</Text>}
  </Doer>
  <Doer before={bucketSize} checker={bs => !!bs?.lwh}>
    {({ lwh }: BucketWithSize) => <Text style={fontSize ? { fontSize } : undefined} >{lwh.length} x {lwh.width} x {lwh.height} {pluralizeSizes(lwh.unit)}</Text>}
  </Doer>
</>
  );

  export const bucketSizeLabelText = ({ volume, lwh }: BucketSize) => !!volume ?
  `${volume.total} ${pluralizeVolumes(volume.unit)}` : !!lwh ? `${lwh.length} x ${lwh.width} x ${lwh.height} ${pluralizeSizes(lwh.unit)}` : '';
