import React from 'react';
import { Modal as ReactModal, StyleSheet, Text, Pressable, View } from 'react-native';

export type TriggerProps = { onPress?: (e: any) => void, children?: any };
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

  const triggerText = triggerLabel || <Text style={styles.textStyle}>Show Modal</Text>;

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
              {onCancel && <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleCancel}
              >
                {cancelLabel || <Text style={styles.textStyle}>cancel</Text>}
                  </Pressable>}
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleSubmit}
              >
                {submitLabel || <Text style={styles.textStyle}>submit</Text>}
              </Pressable>
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
    flexDirection: 'row',
    alignItems: 'flex-end',
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
    alignItems: "center",
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

