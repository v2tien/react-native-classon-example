import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');
const widthItem = (width - 60) / 3;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtName: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vItem: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    width: widthItem,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtDesc: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  vLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    height: 1,
    backgroundColor: 'gray',
    width: '100%',
    marginVertical: 10,
  },
  vRole: {
    paddingVertical: 6,
  },
  txtRole: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
  },
});
