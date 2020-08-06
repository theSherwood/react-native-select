import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  StatusBar,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ScrollIntoView, wrapScrollView } from "react-native-scroll-into-view";

const CustomScrollView = wrapScrollView(ScrollView);
const dark = "#666";

const styles = StyleSheet.create({
  field: {
    width: 100,
    borderColor: dark,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fieldText: {
    color: dark,
    fontWeight: "bold",
  },
  modalView: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
    justifyContent: "space-evenly",
  },
  menu: {
    padding: 15,
    backgroundColor: "white",
    borderTopColor: dark,
    borderTopWidth: 1,
    flexBasis: 120,
    flexDirection: "row",
    justifyContent: "center",
  },
  list: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingVertical: 60,
  },
  option: {
    padding: 10,
    height: 50,
    width: 50,
    flex: 1,
    justifyContent: "center",
  },
  optionText: {
    textAlign: "center",
    color: dark,
  },
  selectedOption: {
    borderColor: dark,
    borderWidth: 1,
    borderRadius: 5000,
  },
  selectedOptionText: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: dark,
    padding: 15,
    borderRadius: 5,
    flexGrow: 0,
    flexShrink: 1,
    width: 100,
    height: 50,
  },
  buttonText: {
    color: "#eee",
    textAlign: "center",
    fontWeight: "bold",
  },
});

const Option = ({ optionStyles, optionTextStyles, onPress, value }) => (
  <TouchableOpacity onPress={onPress} style={optionStyles}>
    <Text style={optionTextStyles}>{value}</Text>
  </TouchableOpacity>
);

export const Select = ({
  options,
  selectedIndex,
  placeholder = "--",
  closeDelayOnSelect,
  initialScrollToIndex,
  menu,
  icon,
  iconSize,
  iconColor,
  fieldStyles = {},
  fieldTextStyles = {},
  modalViewStyles = {},
  menuStyles = {},
  listStyles = {},
  optionStyles = {},
  optionTextStyles = {},
  selectedOptionStyles = {},
  selectedOptionTextStyles = {},
  buttonStyles = {},
  buttonTextStyles = {},
}) => {
  let [selected, setSelected] = useState(selectedIndex);
  let [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  let scrollTargetIndex = selected || initialScrollToIndex;

  let computedOptionStyles = { ...styles.option, ...optionStyles };
  let computedSelectedOptionStyles = {
    ...computedOptionStyles,
    ...styles.selectedOption,
    ...selectedOptionStyles,
  };
  let computedOptionTextStyles = {
    ...styles.optionText,
    ...optionTextStyles,
  };
  let computedSelectedOptionTextStyles = {
    ...computedOptionTextStyles,
    ...styles.selectedOptionText,
    ...selectedOptionTextStyles,
  };

  return (
    <View>
      <TouchableOpacity
        style={{ ...styles.field, ...fieldStyles }}
        onPress={open}
      >
        <Text style={{ ...styles.fieldText, ...fieldTextStyles }}>
          {options[selected] || placeholder}
        </Text>
        {icon ? (
          icon()
        ) : (
          <AntDesign
            name="caretdown"
            size={iconSize || 16}
            color={iconColor || dark}
          />
        )}
      </TouchableOpacity>
      <Modal animationType="slide" visible={isOpen}>
        <StatusBar hidden={true} />
        <View style={{ ...styles.modalView, ...modalViewStyles }}>
          <View>
            <CustomScrollView>
              <View style={{ ...styles.list, ...listStyles }}>
                {options.map((o, idx) =>
                  idx === scrollTargetIndex ? (
                    <ScrollIntoView
                      key={o}
                      animated={false}
                      insets={{ top: 20, bottom: 20 }}
                      align="center"
                    >
                      <View>
                        {idx === selected ? (
                          <Option
                            optionStyles={computedSelectedOptionStyles}
                            optionTextStyles={computedSelectedOptionTextStyles}
                            value={o}
                            onPress={close}
                          />
                        ) : (
                          <Option
                            optionStyles={computedOptionStyles}
                            optionTextStyles={computedOptionTextStyles}
                            value={o}
                            onPress={() => {
                              setSelected(o);
                              setTimeout(close, closeDelayOnSelect || 0);
                            }}
                          />
                        )}
                      </View>
                    </ScrollIntoView>
                  ) : (
                    <View key={o}>
                      <Option
                        optionStyles={computedOptionStyles}
                        optionTextStyles={computedOptionTextStyles}
                        value={o}
                        onPress={() => {
                          setSelected(o);
                          setTimeout(close, closeDelayOnSelect || 0);
                        }}
                      />
                    </View>
                  )
                )}
              </View>
            </CustomScrollView>
          </View>
          {menu ? (
            menu()
          ) : (
            <View style={{ ...styles.menu, ...menuStyles }}>
              <TouchableOpacity
                style={{ ...styles.button, ...buttonStyles }}
                onPress={close}
              >
                <Text style={{ ...styles.buttonText, ...buttonTextStyles }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};
