import React from 'react';
import { ScrollView, Modal as ReactModal, StyleSheet, Text, Pressable, View } from 'react-native';
import { Title } from './Title';
import { RemoveButton } from './RemoveButton';
import { CheckButton } from './CheckButton';

export type TriggerProps = { onPress?: () => void, children?: any };
export type TriggerType = React.ComponentClass<TriggerProps> | React.FC<TriggerProps>;

type Props = {
  title?: React.ReactNode;
  children?: React.ReactNode;
  onSubmit?: () => void;
  onCancel?: () => void;
  show?: boolean;
  submitLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
  showTrigger?: boolean;
  triggerLabel?: React.ReactNode;
  Trigger?: TriggerType;
};

export function Modal({
    title,
    children,
    onSubmit,
    onCancel,
    show,
    submitLabel,
    cancelLabel,
    showTrigger,
    triggerLabel,
    Trigger,
}: Props) {
  const [modalVisible, setModalVisible] = React.useState(show || false);

  React.useEffect(() => {
    if (show !== undefined) {
      setModalVisible(show);
    }
  }, [show]);
  const handleSubmit = () => {
    onSubmit ? onSubmit() : undefined;
    setModalVisible(false);
  };
  const handleCancel = () => {
    onCancel ? onCancel() : undefined;
    setModalVisible(false);
  };

  const triggerText = triggerLabel || <Text>Show Modal</Text>;

  return (
    <View>
      <ReactModal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, {flex:1}]}>
            {title && <Title>{title}</Title>}
            <ScrollView>{children}</ScrollView>
          </View>
          <View style={styles.actionBar}>
            <RemoveButton
              size="big"
              onPress={handleCancel}
            >
              {cancelLabel || <Text>cancel</Text>}
            </RemoveButton>
            <CheckButton
              size="big"
              onPress={handleSubmit}
            >
              {submitLabel || <Text>submit</Text>}
            </CheckButton>
          </View>
        </View>
      </ReactModal>
      {showTrigger && Trigger && <Trigger onPress={() => setModalVisible(true)}>{triggerText}</Trigger>}
      {showTrigger && !Trigger && <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        {triggerText}
      </Pressable>}
    </View>
  );
}

const styles = StyleSheet.create({
  actionBar: {
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  centeredView: {
    paddingTop: 40,
    flex: 1,
  },
  modalView: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    backgroundColor: "white",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
});

