import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('screen');
const widthItem = (width - 80) / 4;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    margin: 10,
    padding: 6,
    width: widthItem,
    backgroundColor: 'white',
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
  },
  vLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: '100%',
    height: 100,
    backgroundColor: '#ddd',
    marginBottom: 5,
    borderRadius: 5,
  },
});
