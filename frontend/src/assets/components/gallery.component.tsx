import { useEffect, useState } from "react";
import ResultComponent from "./result.component";
import axios from "axios";
/**
 * Interface for components
 */
export interface Currency {
  name: string;
  purchase?: number;
  sale?: number;
}

const url = "http://localhost:2222";
/**
 * GalleryCompponent component
 * @param props React props
 */
const GalleryComponent = (props: { data: any }) => {
  const namesURL = url + "/names";
  const [result, setResult] = useState<any[]>([]);
  const valuesURL = url + "/all";
  const [values, setValues] = useState<any[]>([]);
  const { data } = props;

  /**
   * fetching the async data
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(namesURL, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const names = await response.data;
        setResult(names);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [namesURL]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(valuesURL, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const value = await response.data;
        //console.log({value})
        setValues(await value);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [valuesURL]);

  /**
   * function for determining the type
   */
  function determineType() {
    if (data.type.buy === "buy") {
      return (
        <>
          <p className="type">Buy: </p>
        </>
      );
    } else {
      return (
        <>
          <p className="type">Sell: </p>
        </>
      );
    }
  }

  /**
   * function for changing the Currency
   * @param name  name of the currency
   */
  function changeCurrency(name: string) {
    values.map(({ id, currency_name, purchase, sale }) => {
      if (name === currency_name) {
        data.setCurrency({
          purchase,
          sale,
          name,
        });
      }
      return null;
    });
  }

  /**
   * function for changing the name 
   * @param e event
   */
  function changeName(e: any) {
    let {
      target: { value },
    } = e;
    changeCurrency(value);
  }

  /**
   * returning ResultComponent
   */
  const returns = (
    <>
      {determineType()}
      <ResultComponent
        result={result}
        value={data.value}
        onChange={changeName}
        currency={data.currency}
        setState={data.setState}
      />
    </>
  );

  return returns;
};

export default GalleryComponent;
