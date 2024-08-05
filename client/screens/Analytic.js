import React, { useEffect, useState ,useCallback} from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';

const PieChartComponent = () => {
  const [analytics, setAnalytics] = useState(null);

  const fetchAnalytics = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('http://192.168.0.104:5000/api/journal/analytics', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAnalytics(response.data.analytics);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(()=>{
    fetchAnalytics();
  },[]);
  useFocusEffect(
    useCallback(() => {
      
      const getJournal = async ()=>{
        const analyticFlag = await AsyncStorage.getItem('analyticFlag');
        if(analyticFlag === '1'){
          fetchAnalytics(); 
          await AsyncStorage.setItem('analyticFlag','0');
        }
      }
      getJournal();
    }, []) 
  );

  const getColor = (index) => {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
    return colors[index % colors.length];
  };

  const calculateArcs = (data) => {
    let totalValue = 0;
    let chartData = [];

    const keys = Object.keys(data);

    if (keys.length === 1) {
      
      const key = keys[0];
      chartData.push({
        startAngle: 0,
        endAngle: 2 * Math.PI - 0.0000003, 
        color: getColor(0),
        label: key,
        value: data[key],
      });
    } else {
      
      keys.forEach((key) => {
        totalValue += data[key];
      });

      let startAngle = 0;

      keys.forEach((key, index) => {
        const value = data[key];
        const angle = (value / totalValue) * 2 * Math.PI;

        chartData.push({
          startAngle,
          endAngle: startAngle + angle,
          color: getColor(index),
          label: key,
          value,
        });

        startAngle += angle;
      });
    }

    return chartData;
  };

  const createArc = (d, outerRadius) => {
    const start = polarToCartesian(outerRadius, d.startAngle);
    const end = polarToCartesian(outerRadius, d.endAngle);
    const largeArcFlag = d.endAngle - d.startAngle <= Math.PI ? '0' : '1';

    const path = [
      `M${start.x},${start.y}`, 
      `A${outerRadius},${outerRadius} 0 ${largeArcFlag},1 ${end.x},${end.y}`, 
      'L0,0', 
      'Z' 
    ].join(' ');

    return path;
  };

  const polarToCartesian = (radius, angleInRadians) => {
    return {
      x: radius * Math.cos(angleInRadians),
      y: radius * Math.sin(angleInRadians)
    };
  };

  return (
    <>
      {!analytics ? (
        <View style={styles.placeholderContainer}>
          <Text>Log Journal</Text>
        </View>
      ) : (
        <ScrollView style={styles.container}>
          {analytics && Object.keys(analytics).map((field, fieldIndex) => (
            <View key={fieldIndex} style={styles.chartContainer}>
              <Text style={styles.chartTitle}>{field}</Text>
              <Svg width={300} height={300} viewBox="-150 -150 300 300">
                <G>
                  {calculateArcs(analytics[field]).map((d, i) => (
                    <G key={i}>
                      <Path d={createArc(d, 150)} fill={d.color} />
                      <SvgText
                        x={polarToCartesian(100, (d.startAngle + d.endAngle) / 2).x}
                        y={polarToCartesian(100, (d.startAngle + d.endAngle) / 2).y}
                        fill="black"
                        fontSize="10"
                        textAnchor="middle"
                        alignmentBaseline="middle"
                      >
                        {d.label}
                      </SvgText>
                    </G>
                  ))}
                </G>
              </Svg>
            </View>
          ))}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7EDF1',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <PieChartComponent />
    </View>
  );
}
