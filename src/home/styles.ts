import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('screen');
const widthItem = (width - 48) / 4;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    margin: 6,
    padding: 6,
    width: widthItem,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  txtName: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
  txtDesc: {
    fontSize: 13,
    color: 'black',
    marginTop: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
});
