import React, {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  FieldErrorsImpl,
  FieldValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import {
  Dimensions,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { t } from 'i18next';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
  IconButton,
  Portal,
  Text,
  TextInput,
  TouchableRipple,
} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

import CrossIcon from 'assets/icons/CrossIcon';
import SimpleCheckmarkIcon from 'assets/icons/SimpleCheckmarkIcon';
import useDebounce from 'utils/useDebounce';
import { colors } from 'utils/colors';
import AnimatedFlatOrScroll from 'components/AnimatedFlatOrScroll';

export interface Option {
  key?: string;
  label: string;
  value: any;
}

const RightIcon: React.FC<{
  isExpanded: boolean;
  disabled: boolean;
  customIconExpanded?: ReactNode;
  customExpandIconSize?: number;
  customExpandIconColor?: string;
  customIconNotExpanded?: ReactNode;
  customNotExpandIconSize?: number;
  customNotExpandIconColor?: string;
}> = ({
  isExpanded,
  disabled,
  customIconExpanded,
  customExpandIconSize,
  customExpandIconColor,
  customIconNotExpanded,
  customNotExpandIconSize,
  customNotExpandIconColor,
}) => {
  if (isExpanded) {
    return (customIconExpanded ?? (
      <Feather
        name="chevron-down"
        size={customExpandIconSize ?? 20}
        color={
          customExpandIconColor ?? !disabled
            ? colors.PRIMARY
            : colors.LIGHT_GREY
        }
      />
    )) as ReactElement;
  } else {
    return (customIconNotExpanded ?? (
      <Feather
        name="chevron-right"
        size={customNotExpandIconSize ?? 20}
        color={
          customNotExpandIconColor ?? !disabled
            ? colors.PRIMARY
            : colors.LIGHT_GREY
        }
      />
    )) as ReactElement;
  }
};

interface ItemProps {
  item: Option;
  index: number;
  data: Option[];
  isSelected: boolean;
  handleOnPress: (item: Option) => void;
}

const Item: React.FC<ItemProps> = React.memo(
  ({ item, index, data, isSelected, handleOnPress }) => (
    <View
      key={item.value}
      style={[styles.item, index === data.length - 1 && styles.lastItem]}>
      <TouchableRipple
        rippleColor={colors.BLUE_PICKER}
        style={[styles.itemNameButton, isSelected && styles.selectedButton]}
        onPress={() => handleOnPress(item)}>
        <View style={styles.itemTextContainer}>
          <Text
            numberOfLines={1}
            style={[styles.itemName, isSelected && styles.itemTextSelected]}>
            {item.label}
          </Text>
          {isSelected && (
            <SimpleCheckmarkIcon
              customSize={12}
              customColor={colors.PRIMARY}
              customStyle={styles.selectedIcon}
            />
          )}
        </View>
      </TouchableRipple>
    </View>
  ),
);

interface Props {
  data: Option[];
  parentMarginLeft?: number;
  label?: string;
  customPlaceholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  allowClear?: boolean;
  multiple?: boolean;
  defaultValue?: any;
  onChange?: (itemSelected: Option) => void;

  customContainerStyle?: ViewStyle;
  customLabelStyle?: TextStyle;
  customToggleButtonContainer?: ViewStyle;
  customSelectedValueText?: TextStyle;
  customRightSideStyle?: ViewStyle;
  customSearchContainerStyle?: ViewStyle;
  customClearIconStyle?: ViewStyle;
  customSearchTextStyle?: TextStyle;
  customPickerContainerStyle?: ViewStyle;
  customEdgeStyle?: ViewStyle;

  customIconExpanded?: ReactNode;
  customIconNotExpanded?: ReactNode;
  customEmptyComponent?: ReactElement;
  CustomRenderItem?: React.FC<ItemProps>;

  customClearIconSize?: number;
  customClearIconColor?: string;
  customExpandIconSize?: number;
  customExpandIconColor?: string;
  customNotExpandIconSize?: number;
  customNotExpandIconColor?: string;
  customSearchIconSize?: number;
  customSearchIconColor?: string;

  formFieldName?: string;
  setValue?: UseFormSetValue<FieldValues>;
  watch?: UseFormWatch<FieldValues>;
  errors?: Partial<
    FieldErrorsImpl<{
      [x: string]: any;
    }>
  >;
}

const BOTTOM_TRESHOLD = 100;

const Dropdown: React.FC<Props> = ({
  data,
  parentMarginLeft = 0,
  customPlaceholder,
  allowClear = true,
  searchable = true,
  multiple = false,
  disabled = false,
  label,
  defaultValue,
  onChange,

  customContainerStyle,
  customLabelStyle,
  customToggleButtonContainer,
  customSelectedValueText,
  customRightSideStyle,
  customSearchContainerStyle,
  customClearIconStyle,
  customPickerContainerStyle,
  customSearchTextStyle,
  customEdgeStyle,

  customIconExpanded,
  customIconNotExpanded,
  customEmptyComponent,
  CustomRenderItem,

  customClearIconSize,
  customClearIconColor,
  customExpandIconSize,
  customExpandIconColor,
  customNotExpandIconSize,
  customNotExpandIconColor,
  customSearchIconSize,
  customSearchIconColor,

  formFieldName,
  setValue,
  watch,
}) => {
  const insets = useSafeAreaInsets();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<any[] | undefined>([]);
  const [filteredValues, setFilteredValues] = useState<Option[]>([]);
  const [query, setQuery] = useState<string>('');
  const [coords, setCoords] = useState<any>({});

  const debouncedQuery = useDebounce(query, 300);

  const height: ViewStyle = useMemo(() => {
    return {
      height:
        styles.listContainer.paddingVertical * 2 +
        data.length * styles.itemNameButton.height,
    };
  }, [data]);

  const maxHeight: ViewStyle = useMemo(() => {
    return {
      maxHeight: searchable ? 160 : 160 - styles.input.height,
    };
  }, [searchable]);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length === 0) {
      setFilteredValues(data);
    } else {
      setFilteredValues(
        data.filter(item =>
          item.label.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    }
  }, [debouncedQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setSelectedValues(
      watch && formFieldName
        ? !multiple
          ? watch(formFieldName) && [watch(formFieldName)]
          : watch(formFieldName)
        : defaultValue
        ? !multiple
          ? [defaultValue]
          : defaultValue
        : [],
    );
  }, [
    watch,
    formFieldName,
    watch && formFieldName && watch(formFieldName), // eslint-disable-line react-hooks/exhaustive-deps
    defaultValue,
    multiple,
  ]);

  const textToShow = useMemo(() => {
    if (selectedValues?.length && selectedValues.length > 0) {
      if (!multiple) {
        return data.find(item => item.value === selectedValues[0])?.label;
      } else {
        return data
          .reduce((prevValue, item) => {
            if (selectedValues.includes(item.value)) {
              return [...prevValue, item.label];
            } else {
              return prevValue;
            }
          }, [] as string[])
          .join(', ');
      }
    } else {
      return customPlaceholder ?? t('SELECT_OPTION');
    }
  }, [selectedValues, multiple, data, customPlaceholder]);

  const modalPositionStyle = useMemo((): ViewStyle => {
    const { height: heightNumber } = height;
    const { maxHeight: maxHeightNumber } = maxHeight;
    const toggleButtonHeight =
      (customToggleButtonContainer?.height as number) ??
      styles.toggleButtonContainer.height;
    const tempTop: number = coords.y + toggleButtonHeight;
    if (heightNumber && maxHeightNumber && tempTop) {
      const heightThatMatters: number =
        heightNumber > maxHeightNumber
          ? (maxHeightNumber as number)
          : (heightNumber as number);
      const upsideDown =
        tempTop + heightThatMatters >
        Dimensions.get('screen').height - (BOTTOM_TRESHOLD + insets.bottom);
      return {
        top: upsideDown
          ? tempTop - heightThatMatters - toggleButtonHeight
          : tempTop,
        left: coords.x - parentMarginLeft,
        width: coords.width,
      };
    } else {
      return {};
    }
  }, [
    coords.x,
    coords.y,
    coords.width,
    customToggleButtonContainer,
    parentMarginLeft,
    height,
    maxHeight,
    insets.bottom,
  ]);

  const clearIcon = useCallback(
    () => (
      <CrossIcon
        customSize={customClearIconSize ?? 15}
        customColor={customClearIconColor ?? colors.GREY}
      />
    ),
    [customClearIconSize, customClearIconColor],
  );

  const handleToggleLayout = (event: any) => {
    event.target.measure(
      (
        x: number,
        y: number,
        width: number,
        _height: number,
        pageX: number,
        pageY: number,
      ) => {
        const nextX = x + pageX;
        const nextY = y + pageY;
        if (coords.x !== nextX || coords.y !== nextY) {
          setCoords({ x: x + pageX, y: y + pageY, width });
        }
      },
    );
  };

  const handleToggleDropdown = () => {
    setIsExpanded(prevState => !prevState);
  };

  const handleOptionPressed = (option: Option) => {
    let newValue;
    if (!multiple) {
      newValue = option.value;
      setSelectedValues([newValue]);
      setIsExpanded(false);
    } else {
      setSelectedValues(prevState => {
        if (prevState && prevState.includes(option.value)) {
          newValue = prevState.filter(
            selectedValue => selectedValue !== option.value,
          );
        } else if (prevState) {
          newValue = [...prevState, option.value];
        } else {
          newValue = [option.value];
        }
        return newValue;
      });
    }
    setValue && formFieldName && setValue(formFieldName, newValue);
    onChange && onChange(option);
  };

  const handleClearPressed = () => {
    setSelectedValues(undefined);
    setValue && formFieldName && setValue(formFieldName, undefined);
  };

  const handleDismiss = () => {
    setIsExpanded(false);
  };

  return (
    <View style={[styles.container, customContainerStyle]}>
      {label && (
        <Text style={[styles.textInputLabel, customLabelStyle]}>{label}</Text>
      )}
      <View>
        <TouchableOpacity
          style={[
            styles.toggleButtonContainer,
            isExpanded && styles.toggleButtonContainerExpanded,
            disabled && styles.toggleButtonContainerDisabled,
            customToggleButtonContainer,
          ]}
          onPress={handleToggleDropdown}
          disabled={disabled}
          onLayout={handleToggleLayout}>
          <Text style={[styles.selectedValueText, customSelectedValueText]}>
            {textToShow}
          </Text>
          <View style={[styles.rightSide, customRightSideStyle]}>
            {allowClear &&
            !disabled &&
            selectedValues?.length &&
            selectedValues?.length > 0 ? (
              <IconButton
                icon={clearIcon}
                onPress={handleClearPressed}
                style={[styles.clearIcon, customClearIconStyle]}
              />
            ) : (
              <></>
            )}
            <RightIcon
              isExpanded={isExpanded}
              disabled={disabled}
              customIconExpanded={customIconExpanded}
              customExpandIconSize={customExpandIconSize}
              customExpandIconColor={customExpandIconColor}
              customIconNotExpanded={customIconNotExpanded}
              customNotExpandIconSize={customNotExpandIconSize}
              customNotExpandIconColor={customNotExpandIconColor}
            />
          </View>
        </TouchableOpacity>
      </View>
      {isExpanded && (
        <Portal>
          <TouchableWithoutFeedback
            style={styles.restOfTheScreen}
            onPress={handleDismiss}>
            <View
              style={[
                styles.pickerContainerStyle,
                height,
                maxHeight,
                modalPositionStyle,
                customPickerContainerStyle,
              ]}>
              {searchable && (
                <View style={customSearchContainerStyle}>
                  <TextInput
                    style={[
                      styles.textInput,
                      styles.input,
                      customSearchTextStyle,
                    ]}
                    placeholder={t<string>('SEARCH')}
                    placeholderTextColor={colors.LIGHT_GREY}
                    right={
                      <TextInput.Icon
                        icon="magnify"
                        size={customSearchIconSize ?? 15}
                        color={customSearchIconColor ?? colors.LIGHT_GREY}
                      />
                    }
                    onChangeText={text => {
                      setQuery(text);
                    }}
                  />
                </View>
              )}
              <AnimatedFlatOrScroll
                flatList
                flatListProps={{
                  data: filteredValues,
                  contentContainerStyle: styles.listContainer,
                  ListEmptyComponent: customEmptyComponent ?? (
                    <Text style={styles.emptyText}>
                      {t('NO_CONTENT_FOUND')}
                    </Text>
                  ),
                  renderItem: ({
                    item,
                    index,
                  }: {
                    item: Option;
                    index: number;
                  }) =>
                    CustomRenderItem ? (
                      <CustomRenderItem
                        item={item}
                        index={index}
                        data={data}
                        handleOnPress={handleOptionPressed}
                        isSelected={
                          selectedValues
                            ? selectedValues.includes(item.value)
                            : false
                        }
                      />
                    ) : (
                      <Item
                        item={item}
                        index={index}
                        data={data}
                        handleOnPress={handleOptionPressed}
                        isSelected={
                          selectedValues
                            ? selectedValues.includes(item.value)
                            : false
                        }
                      />
                    ),
                }}
                customEdgeStyle={customEdgeStyle ?? styles.edgeHeight}
              />
            </View>
          </TouchableWithoutFeedback>
        </Portal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  selectedValueText: {
    fontSize: 13,
    paddingHorizontal: 5,
    color: colors.DARK_GREY,
  },
  label: {
    fontSize: 13,
  },
  toggleButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: colors.PRIMARY,
    borderBottomWidth: 3,
    height: 40,
    alignItems: 'center',
  },
  toggleButtonContainerExpanded: {
    borderBottomWidth: 0,
  },
  toggleButtonContainerDisabled: {
    borderBottomColor: colors.LIGHT_GREY,
  },
  input: { height: 40, borderBottomWidth: 2, fontSize: 13 },
  pickerContainerStyle: {
    backgroundColor: colors.WHITE,
    elevation: 10,
    shadowColor: colors.BLACK,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 5 },
    paddingHorizontal: 20,
  },
  listContainer: { paddingVertical: 10 },
  item: {
    justifyContent: 'center',
  },
  lastItem: { borderBottomWidth: 0 },
  itemName: { color: colors.BLACK, fontSize: 13, marginHorizontal: 5 },
  itemNameButton: {
    height: 30,
    justifyContent: 'center',
  },
  clearIcon: { marginRight: 0 },
  rightSide: { flexDirection: 'row', alignItems: 'center' },
  selectedButton: { backgroundColor: colors.BLUE_PICKER },
  itemTextSelected: {
    color: colors.PRIMARY,
  },
  itemTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedIcon: {
    marginRight: 5,
  },
  edgeHeight: { height: 15 },
  emptyText: {
    fontSize: 13,
    color: colors.LIGHT_GREY,
    alignSelf: 'center',
  },
  restOfTheScreen: {
    height: '100%',
  },
  textInput: {
    backgroundColor: 'transparent',
    height: 40,
    paddingHorizontal: 5,
    fontSize: 13,
    borderBottomWidth: 3,
    borderBottomColor: colors.PRIMARY,
    textAlignVertical: 'top',
  },
  textInputLabel: { fontSize: 13 },
});

export default Dropdown;
