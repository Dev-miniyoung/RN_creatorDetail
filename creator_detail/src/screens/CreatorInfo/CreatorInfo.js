import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import CreatorVideoCard from '../../components/CreatorVideoCard';
import { getDataApi } from '../../api';
import { renderer } from 'react-test-renderer';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});

const LIMIT = 20;

function CreatorInfo() {
  const [initLoading, setInitLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [creatorInfo, setCreatorInfo] = useState([]);
  const topScroll = useRef(null);

  const getInfo = async (page) => {
    setLoading(true);
    if (page > 10) {
      setLoading(false);
    } else {
      const {
        data: { results },
      } = await getDataApi.dataList(page);
      setCreatorInfo([...creatorInfo, ...results]);
      setOffset(offset + LIMIT);
      setLoading(false);
      setPage(page + 1);
    }
  };

  const renderKeyExtractor = useCallback((item, index) => {
    return index.toString();
  }, []);

  const renderOnEndReached = () => {
    if (loading) {
      return null;
    } else {
      getInfo(page);
    }
  };

  const renderItem = (item) => {
    return <CreatorVideoCard creatorInfo={item} />;
  };

  const scrollToTop = () => {
   return (topScroll.current.getNode().scrollToOffset({
      offset: 0, animated: true
    }))
  }

  useEffect(() => {
    getInfo(page);
    setInitLoading(true);
  }, []);


  return (
    <View style={styles.container}>
      <Text>{`${creatorInfo.length} 개 page: ${page}`}</Text>
      <TouchableOpacity activeOpacity={1} style={{height: 20, }} onPress={() => scrollToTop()}></TouchableOpacity>
      {!initLoading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#f917f9" />
        </View>
      ) : (
        <Animated.FlatList
          ref={topScroll}
          data={creatorInfo}
          keyExtractor={renderKeyExtractor}
          renderItem={renderItem}
          onEndReached={renderOnEndReached}
          onEndReachedThreshold={1}
          ListFooterComponent={
            loading && <ActivityIndicator size="large" color="#f917f9" />
          }
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* <CreatorVideoCard /> */}
    </View>
  );
}

export default CreatorInfo;
