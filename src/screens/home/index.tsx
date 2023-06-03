import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';

import { SampleContext, SampleData } from 'contexts/SampleContext';
import { commonViewStyles } from 'utils/commonStyles';

interface Props {}

const Home: React.FC<Props> = ({}) => {
  const [sampleData, setSampleData] = useState<SampleData>({
    visible: false,
    title: '',
    description: '',
    onConfirm: () => {},
    contentCustomStyle: undefined,
  });

  const sampleContextValue: any = { sampleData, setSampleData };

  return (
    <SampleContext.Provider value={sampleContextValue}>
      <SafeAreaView style={commonViewStyles.container}>
        <Text>Home!</Text>
      </SafeAreaView>
    </SampleContext.Provider>
  );
};

export default Home;
