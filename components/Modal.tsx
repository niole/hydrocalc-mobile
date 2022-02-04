import React from 'react';
import { Modal as ReactModal, StyleSheet, Text, Pressable, View } from 'react-native';
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
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {title && <Text>{title}</Text>}
            {children}
            <View style={styles.actionBar}>
              <RemoveButton
                onPress={handleCancel}
              >
                {cancelLabel || <Text>cancel</Text>}
              </RemoveButton>
              <CheckButton
                onPress={handleSubmit}
              >
                {submitLabel || <Text>submit</Text>}
              </CheckButton>
            </View>
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
    marginTop: 22,
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
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

