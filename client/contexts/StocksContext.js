import React, { useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import isEmail from "validator/lib/isEmail";

const StocksContext = React.createContext();
const SERVER_URL = "http://localhost:3001";
// input your server url here

export const StocksProvider = ({ children }) => {
  const [state, setState] = useState([]);

  return (
    <StocksContext.Provider value={[state, setState]}>
      {children}
    </StocksContext.Provider>
  );
}; // provider

export const useStocksContext = () => {
  const [state, setState] = useContext(StocksContext);
  let wlist = "";
  const [name, setName] = useState("");
  const [checkName, setCheckName] = useState(0);
  const [checkUpdate, setCheckUpdate] = useState(0);

  function addToWatchlist(newSymbol) {
    const checkNewSym = () => {
      console.log("newSymbol: " + JSON.stringify(newSymbol));
      for (let item in state) {
        console.log("item: " + state[item]);
        if (state[item] == JSON.stringify(newSymbol)) {
          return false;
        }
      }
      return true;
    }; // check if newSymbol exist

    const oldState = state;

    if (checkNewSym()) {
      if (oldState == "") {
        setState(() => [newSymbol]);
        // add to watchlist
      } else {
        setState((x) => [...x, newSymbol]);
        // add to watchlist
      }
      setCheckUpdate((x) => x + 1);
    } // newSymbol doesn't exist.
    else {
      alert(newSymbol + " is already in your watchlist.");
    } // newSymbol does exist.
  }
  // add function

  function removeFromWatchlist(Symbol) {
    console.log("rremove sym");
    console.log("item for remove: " + Symbol);

    setState((x) =>
      x.filter((item) => {
        console.log("item for remove: " + item);
        if (item != Symbol) {
          return item;
        }
      })
    );

    setCheckUpdate((x) => x + 1);
  }
  // remove function

  function deleteWatchlist() {
    setState([]);
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      await AsyncStorage.getItem("email").then((value) => {
        if (value != null && value != "") {
          setName(value);
          setCheckName((x) => x + 1);
        }
        console.log("Name", name);
      });
      console.log("Name", name);
      console.log("asyncemail: ", AsyncStorage.getItem("email"));
    } catch (error) {
      console.log(error);
    }
  }; // get async email

  useEffect(() => {
    if (checkUpdate) {
      fetch(`${SERVER_URL}/users/updatewatchlist`, {
        method: "POST",
        body: JSON.stringify({
          email: name == "" ? "banana" : name,
          symbol: sData,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        })
        .then(() => console.log("hey bro you refreshed."))
        .catch((error) => console.error(error));
    }
  }, [checkUpdate]);
  // updated data to back end

  let _retrieveData2 = () => {
    try {
      fetch(`${SERVER_URL}/users/getwatchlist/${name}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.wlist.length !== 0) {
            wlist = res.wlist[0].wlist.split(",");
            setState([]);

            for (let item in wlist) {
              setState((x) => [...x, wlist[item]]);
            }
          }
        });
    } catch (error) {
      console.error(error);
    }
  }; // retrieve data from db

  useEffect(() => {
    if (checkName) {
      _retrieveData2();
    }
    //updatewatchlist()
  }, [checkName]);

  let sData = "";
  let c = 0;
  if (state != null) {
    for (let item in state) {
      if (c == 0) {
        sData = state[item];
        c++;
      } else {
        sData = sData + "," + state[item];
      }
    }
  }

  console.log("watchlist in stockcontext: " + state);

  return {
    ServerURL: "http://localhost:3001",
    // input your server url here
    watchList: state,
    addToWatchlist,
    deleteWatchlist,
    removeFromWatchlist,
  };
};
