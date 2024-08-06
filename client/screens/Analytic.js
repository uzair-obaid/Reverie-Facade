import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { BarChart, PieChart,LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get("window").width;

const DailyAnalytics = () => {
  // Example data
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      
      {
        data: [1000, 4000, 2000, 500, 3000, 1000, 1000],
        color: (opacity = 1) => `rgba(0, 197, 197, ${opacity})`, // Daydreams
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      

      <View style={styles.chartContainer}>
        <Text style={styles.title}>Daydreams & Productivity</Text>
        <LineChart
          data={data}
          width={screenWidth - 40}
          height={220}
          yAxisLabel=""
          yAxisSuffix="k"
          chartConfig={chartConfig}
          bezier
          fromZero
        />
      </View>

      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#0037ff' }]} />
          <Text style={styles.legendText}>Productivity & Tasks</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#00c5c5' }]} />
          <Text style={styles.legendText}>Daydreams</Text>
        </View>
      </View>

      <View style={styles.controlContainer}>
        <TouchableOpacity style={[styles.controlButton, styles.activeControl]}>
          <Text style={styles.controlText}>Spent</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlText}>Categories</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weekdaysContainer}>
        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, index) => (
          <TouchableOpacity key={index} style={styles.dayButton}>
            <Text style={styles.dayText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const chartConfig = {
  backgroundColor: '#cde7e8',
  backgroundGradientFrom: '#cde7e8',
  backgroundGradientTo: '#cde7e8',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#cde7e8',
  },
};

const WeeklyAnalytics = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      

      <Text style={styles.title}>Daydreams(in mins)</Text>

      <BarChart
        data={{
          labels: ['1st Week', '2nd Week', '3rd Week', '4th Week'],
          datasets: [
            { data: [10000, 2000, 10000, 8000], color: () => '#007bff' },
            { data: [6000, 1500, 5000, 4000], color: () => '#28a745' },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix="k"
        chartConfig={{
          backgroundColor: '#f5f5f5',
          backgroundGradientFrom: '#f5f5f5',
          backgroundGradientTo: '#f5f5f5',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        style={styles.chart}
      />

      <View style={styles.legend}>
        <Text style={[styles.legendText, { color: '#007bff' }]}>Productivity</Text>
        <Text style={[styles.legendText, { color: '#28a745' }]}>Daydreams</Text>
      </View>

      <View style={styles.barContainer}>
        {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week, index) => (
          <View key={index} style={styles.bar}>
            <Text style={styles.weekText}>{week}</Text>
            <View style={styles.barInner}>
              <View style={[styles.barSection, { flex: 1, backgroundColor: '#007bff' }]} />
              <View style={[styles.barSection, { flex: 1, backgroundColor: '#28a745' }]} />
              <View style={[styles.barSection, { flex: 1, backgroundColor: '#6c757d' }]} />
            </View>
            <Text style={styles.barText}>Total Time Spent Daydreaming : 3 Hours</Text>
          </View>
        ))}
      </View>

      <View style={styles.totalTimeContainer}>
        <Text style={styles.totalTime}>12 Hours</Text>
        <Text style={styles.totalTimeText}>Total Time Spent Daydreaming Over The Weeks</Text>
      </View>
    </ScrollView>
  );
};

const MonthlyAnalytics = () => {
  const maxHeight = 150;
  const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const data = [0, 0, 0, 0, 0, 0,0, 0, 271, 0, 0, 0];
  const maxData = Math.max(...data);
  const heights = data.map(value => (value / maxData) * maxHeight);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={[{width:screenWidth - 30},styles.barChartContainer]}>
      <Text style={styles.header}>Daydreams (in mins)</Text>
        <View style={[{ height: maxHeight + 30 }, styles.barChart]}>
          <Text style={[{bottom:maxHeight/5*5,transform: [{ translateX: 0 }, { translateY: 6 }],fontSize:10},styles.scaleBar]}>{Math.round(maxData/5*5)}  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </Text>
          <Text style={[{bottom:maxHeight/5*4,transform: [{ translateX: 0 }, { translateY: 6 }],fontSize:10},styles.scaleBar]}>{Math.round(maxData/5*4)}  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </Text>
          <Text style={[{bottom:maxHeight/5*3,transform: [{ translateX: 0 }, { translateY: 6 }],fontSize:10},styles.scaleBar]}>{Math.round(maxData/5*3)}  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </Text>
          <Text style={[{bottom:maxHeight/5*2,transform: [{ translateX: 0 }, { translateY: 6}],fontSize:10},styles.scaleBar]}>{Math.round(maxData/5*2)}  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </Text>
          <Text style={[{bottom:maxHeight/5*1,transform: [{ translateX: 0 }, { translateY: 6 }],fontSize:10},styles.scaleBar]}>{Math.round(maxData/5*1)}  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </Text>
          {heights.map((height, index) => (
            <View
              key={index}
              style={{
                height,
                backgroundColor: "blue",
                marginLeft: 9,
                marginRight: 6,
                width: 6,
                
                marginTop:"auto",
                
                borderTopLeftRadius:5,
                borderTopRightRadius:5
              }}
            >
            </View>
            
          ))}
          

        </View>
        <View style={styles.labelContainer}>
    {monthList.map((month, index) => (
      <Text
        key={index}
        style={{
          marginLeft: 4.5,
          marginRight: .6,
          width: 16,
          fontSize: 10, 
          textAlign: 'center',
          fontWeight:"ultralight",
          marginTop:1
        }}
      >
        {month}
      </Text>
    ))}
  </View>
      </View>
      <PieChart
        data={[
          { name: 'Tasks without daydreams', population: 50.84, color: '#4682b4' },
          { name: 'Daydreams (anytime apart from tasks)', population: 10.33, color: '#00fa9a' },
          { name: 'Others', population: 2.51, color: '#dda0dd' },
          { name: 'Daydreams during tasks', population: 1.47, color: '#7b68ee' },
          { name: 'Frequent emotion', population: 4.68, color: '#4b0082' },
          { name: 'Frequent daydream theme', population: 4.19, color: '#b0e0e6' }
        ]}
        width={screenWidth - 30}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        style={styles.chart}
      />
      <Text style={styles.reductionText}>30% Reduction of daydreaming compared to previous month</Text>
    </ScrollView>
  );
}

const AnalyticsScreen = () => {
  const [currentScreen, setCurrentScreen] = useState("Monthly");
  return (
    <View style={styles.body}>
      <View style={[{width:screenWidth - 30},styles.mainContainer]}>
        <TouchableOpacity onPress={() => { setCurrentScreen("Daily") }} style={currentScreen === "Daily" ? styles.analyticBtnFocused : styles.analyticBtnUnfocused}>
          <Text style={currentScreen === "Daily" ? styles.analyticBtnText : ""}>Daily</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setCurrentScreen("Weekly") }} style={currentScreen === "Weekly" ? styles.analyticBtnFocused : styles.analyticBtnUnfocused}>
          <Text style={currentScreen === "Weekly" ? styles.analyticBtnText : ""}>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setCurrentScreen("Monthly") }} style={currentScreen === "Monthly" ? styles.analyticBtnFocused : styles.analyticBtnUnfocused}>
          <Text style={currentScreen === "Monthly" ? styles.analyticBtnText : ""}>Monthly</Text>
        </TouchableOpacity>
      </View>
      {currentScreen === "Daily" ? (<DailyAnalytics />) : currentScreen === "Weekly" ? (<WeeklyAnalytics />) : (<MonthlyAnalytics />)}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#E7EDF1",
    minHeight: "100%",
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 40,
    marginTop: 20,
    height: 60,
    backgroundColor: "white",
    padding: 5,
    paddingLeft: 30,
    paddingRight: 30,
    marginLeft:"auto",
    marginRight:"auto",
  },
  analyticBtnFocused: {
    backgroundColor: "#4D6175",
    borderRadius: 20,
    height: "100%",
    width: "34%",
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    color: "white"
  },
  analyticBtnUnfocused: {
    borderRadius: 20,
    height: "100%",
    width: "34%",
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  analyticBtnText: {
    color: "white"
  },
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f4f7',
    flexGrow: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
  },
  reductionText: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  barChartContainer:{
    backgroundColor:"#fff",
    padding:20,
    borderRadius:20
    
  },
  barChart:{
    backgroundColor:"white",
    flexDirection:"row",
    borderBottomWidth:1,
    borderBottomColor:"#222",
    width:"100%",
    marginLeft:"auto",
    marginRight:"auto",
    justifyContent:"center",
    textAlign:"center",
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    paddingTop:30,
    position:"relative"
  },
  labelContainer:{
    backgroundColor:"white",
    justifyContent:"center",
    flexDirection:"row",
    width:"100%",
    marginLeft:"auto",
    marginRight:"auto",
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    paddingBottom:10
  },
  scaleBar:{
    position:"absolute",
    left:0,
    color:"grey",
    
    
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeTab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#9DA3E1',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  tabText: {
    color: '#000',
  },
  activeTabText: {
    color: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  legendText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  barContainer: {
    marginTop: 20,
  },
  bar: {
    marginBottom: 10,
  },
  weekText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  barInner: {
    flexDirection: 'row',
    height: 20,
    borderRadius: 5,
    overflow: 'hidden',
  },
  barSection: {
    height: '100%',
  },
  barText: {
    marginTop: 5,
    fontSize: 12,
    color: '#6c757d',
  },
  totalTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  totalTime: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 5,
  },
  totalTimeText: {
    fontSize: 14,
    color: '#6c757d',
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  legendContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendColor: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
  },
  controlContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  controlButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#6f7e8a',
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  activeControl: {
    backgroundColor: '#fff',
    color: '#6f7e8a',
  },
  controlText: {
    color: '#fff',
  },
  weekdaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#6f7e8a',
    marginHorizontal: 5,
  },
  dayText: {
    color: '#fff',
  },
  
});

export default AnalyticsScreen;
