import { PunchoutPostApi } from "@services/punchout.service";
import axios from "axios";
import getRawBody from "raw-body";
import { useEffect, useState } from "react";

const Punchout = (props: any) => {
  console.log(props.returnUrl);

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(props.body);
      let obj: Record<string, any> = {
        pos: params.get("pos"),
        return_url: params.get("return_url"),
        params: JSON.parse(params.get("params") || ""),
      };

      let a = `${JSON.stringify(obj)}`;
      const b = await PunchoutPostApi(a);
      const xml = b.toString().replace("###StoreUrl###", `https://${props.returnUrl}`)
      console.log(a, b, xml);
      
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: obj.return_url,
        withCredentials: false,
        headers: {
          "Content-Type": "application/xml",
          "Access-Control-Allow-Origin": "*",
        },
        data: xml.replace(
          "https://pkthehartforddev.parsonskellogg.com/home/index",
          "https://humanadev.parsonskellogg.com"
        ),
      };
      console.log("CI", config);
      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((err) => console.log(err));
    })();
  }, []);

  return <>This page exists and getting response</>;
};

export default Punchout;

export const getServerSideProps = async (context: any) => {
  const body = await getRawBody(context?.req);
  return {
    props: { body: body.toString(), returnUrl: context.req.headers.host },
  };
};
