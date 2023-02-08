import React, { useEffect, useState } from "react";
import ExchangeComponent from "../components/exchange.component";
import GalleryComponent, { Currency } from "../components/gallery.component";
import { Type } from "../components/Type.interface";
// import HeaderComponent from "../components/header.component";

const ExchangeApplication = () => {
  const [doIt, setDoIt] = useState(true);
  const [buy, setBuy] = useState(0.0);
  const [sell, setSell] = useState(0.0);
  const [buyCurrency, setBuyCurrency] = useState<Currency>({
    name: "",
    purchase: 1,
    sale: 1,
  });
  const [sellCurrency, setSellCurrency] = useState<Currency>({
    name: "",
    purchase: 1,
    sale: 1,
  });
  const [buyError, setErrorBuy] = useState("");
  const [sellError, setErrorSell] = useState("");
  const [buyType, setBuyType] = useState<Type>({ buy: "buy", sell: "" });
  const [sellType, setSellType] = useState<Type>({ buy: "", sell: "sell" });
  let txt = "Exchange application";

  function handleBuy(e: any) {
    let {
      target: { value },
    } = e;
    value = "0" + value;
    const regex = /^[0-9]*$/;
    const found = value.match(regex);
    const result = new RegExp(regex).test(value);
    if (!result) {
      setErrorBuy("The value entered has to be number");
      console.log(value);
    }
    if (!found) {
      setErrorBuy("The value entered has to be number");
      console.log(value);
      // setBuy(0);
    } else {
      setErrorBuy("");
      setBuy(Number(found.join("")));
    }
    // setBuy(e.target.value);
  }

  function handleSell(e: any) {
    let {
      target: { value },
    } = e;
    value = "0" + value;
    const regex = /^[0-9]*$/;
    const found = value.match(regex);
    const result = new RegExp(regex).test(value);
    if (!result) {
      setErrorSell("The value entered has to be number");
      console.log(value);
    }
    if (!found) {
      setErrorSell("The value entered has to be number");
      console.log(value);
    } else {
      setErrorSell("");
      setSell(Number(found.join("")));
    }
  }

  function typeChange() {
    setBuyType(sellType);
    setSellType(buyType);
    setBuy(sell);
    setSell(buy);
    setBuyCurrency(sellCurrency);
    setSellCurrency(buyCurrency);
  }

  const calcConversion = (
    amt: number,
    from: Currency,
    to: Currency
  ): number => {
    amt = Number(amt);
    console.log({ amt, from, to });
    if (!from || !from.purchase || !from.sale) return 0;
    if (!to || !to.sale || !to.purchase) return 0;

    let base = to.sale / from.sale;

    let sell = amt * base;

    return sell;
  };

  useEffect(() => {
    console.log("BUYING");
    if (doIt) {
      setSell(calcConversion(buy, sellCurrency, buyCurrency));
      setDoIt(false);
    } else {
      setDoIt(true);
    }
  }, [buy]);

  useEffect(() => {
    console.log("SELLING");
    if (doIt) {
      setBuy(calcConversion(sell, buyCurrency, sellCurrency));
      setDoIt(false);
    } else {
      setDoIt(true);
    }
  }, [sell]);

  return (
    <>
      <div className="container">
        <h1 className="header">{txt}</h1>

        <GalleryComponent
          data={{
            type: sellType,
            value: sell,
            setState: handleSell,
            setCurrency: setSellCurrency,
            currency: sellCurrency,
          }}
        />
        <p className="error">{sellError}</p>

        <ExchangeComponent
          type={typeChange}
          from={buyCurrency}
          to={sellCurrency}
        />

        <GalleryComponent
          data={{
            type: buyType,
            value: buy,
            setState: handleBuy,
            setCurrency: setBuyCurrency,
            currency: buyCurrency,
          }}
        />
        <p className="error">{buyError}</p>
      </div>
    </>
  );
};

export default ExchangeApplication;
