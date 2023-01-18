import { scaleSize } from "../constants/Layout";
import { SafeAreaView, View, Dimensions, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Divider } from "react-native-elements";
import { useEffect, useState } from "react";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

export default function getPriceData(sym, date1) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    console.log("received sym", sym)

    const API_KEY = "72b24ce965fd0980f888f7bbdc0bd4c7";
    //fmp api

    async function getHistory(sym) {

        console.log("async no nakano sym",sym)
        let res = await fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${sym}?timeseries=360&apikey=${API_KEY}`);
        let data = await res.json();
        let priceHis = data["historical"]

        return priceHis.map((item) => {
            return {
                date: item["date"],
                open: item["open"],
                high: item["high"],
                low: item["low"],
                close: item["close"],
                volume: item["volume"],
            };
        })
    }

    const [rowData, setRowData] = useState([]);
    useEffect(() => {
        (async () => {

            try{
                setRowData(await getHistory(sym));
                setLoading(false);
            }catch(err){
                console.log("err is :",err);
                setError(err);
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return (
            <SafeAreaView>
                <Text style={styles.titleText}>Loading...</Text>
            </SafeAreaView>
        );
    } else if (error) {
        return (
            <SafeAreaView>
                <Text style={styles.titleText}>Something went wrong</Text>
            </SafeAreaView>
        );
    } else {
        const date = rowData.map((x) => x.date);
        let date_filter = [];
        const close = rowData.map((x) => x.close);
        let close_filter = [];
        if(date1 == 7){
            for (let i = 0; i < 7; i = i + 1) {
                date_filter.push(date[i]);
            }
            for (let i = 0; i < 7; i = i + 1) {
                close_filter.push(close[i]);
            }
        }
        else if(date1==30){
            for (let i = 0; i < 35; i = i + 5) {
                date_filter.push(date[i]);
            }
            for (let i = 0; i < 35; i = i + 1) {
                close_filter.push(close[i]);
            }
        }
        else if(date1 == 90){
            for (let i = 0; i < 90; i = i + 15) {
                date_filter.push(date[i]);
            }
            for (let i = 0; i < 90; i = i + 1) {
                close_filter.push(close[i]);
            }
        }
        else if(date1 == 180){
            for (let i = 0; i < 180; i = i + 30) {
                date_filter.push(date[i]);
            }
            for (let i = 0; i < 180; i = i + 1) {
                close_filter.push(close[i]);
            }
        }
        else{
            for (let i = 0; i < date.length; i = i + 60) {
                date_filter.push(date[i]);
            }
            for (let i = 0; i < close.length; i = i + 1) {
                close_filter.push(close[i]);
            }
        }

        const latestOpen = rowData[rowData.length - 1].open.toFixed(3);
        const latestVolume = rowData[rowData.length - 1].volume.toFixed(3);
        const latestHigh = rowData[rowData.length - 1].high.toFixed(3);
        const latestLow = rowData[rowData.length - 1].low.toFixed(3);
        const latestClose = rowData[rowData.length - 1].close.toFixed(3);

        let state = {
            tableColHead: [// set first columns' heading
              'Open', 'Close', 'Volume',
            ],
            tableColHead2: [// set second columns' heading
              'High', 'Low',
            ],
            tableData: [// set first columns' data
              [latestOpen],
              [latestClose],
              [latestVolume],
            ],
            tableData2: [// set second columns' data
              [latestHigh],
              [latestLow],
            ]
          }

        const dataClose = {
            datasets: [
              {
                //data: close_filter.reverse(),
                data: close_filter.reverse(),
              },
            ],
            //legend: [`${quoteData[sym.index].sym} close prices over a month`], // optional
          };

        return (
            <View style={styles.graph1}>
                <LineChart
                    data={dataClose}
                    withDots={false}
                    width={Dimensions.get("window").width} // from react-native
                    height={scaleSize(200)}
                    yAxisLabel="$"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#1b1c1e",
                        backgroundGradientFrom: "#1b1c1e",
                        backgroundGradientTo: "#1b1c1e",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 14
                    }}
                />
                
                <View style={styles.table1}>
                <Table borderStyle={{ borderWidth: 1.5, borderColor: '#b5b5b5' }}>
                    <TableWrapper style={styles.wrapper}>
                        <Col data={state.tableColHead} style={styles.dataText} />
                        <Rows data={state.tableData} flexArr={[1, 1]}  style={styles.dataText} textStyle={styles.dataText} />
                        <Col data={state.tableColHead2} style={styles.dataText} />
                        <Rows data={state.tableData2} flexArr={[1, 1]}  style={styles.dataText} textStyle={styles.dataText} />
                    </TableWrapper>
                </Table>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 30,
        color: "black",
    },
    dataText: {
        fontSize: 14,
        color: "black",
    },
    dataContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 10,
        marginBottom: 15,
    },
    wrapper: { flexDirection: 'row' },
    graph1:{
        paddingTop:5,
    },
    table1:{
        paddingTop:5,
    }
});