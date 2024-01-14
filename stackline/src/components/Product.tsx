import React from "react";
import { useEffect, useState } from "react";
import { getProductData } from "../redux/reducers";
import { useAppDispatch, useAppSelector } from "../redux/store";
import Spinner from "./Spinner";
import { v4 as uuidv4 } from "uuid";

function Product() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProductData());
  }, []);

  const { data, loading, error } = useAppSelector(state => state.data);

  if (loading || !data) {
    return <Spinner />;
  }

  return (
    <div id="product">
      {data && (
        <>
          <figure>
            <img
              src={data.image}
              alt={data.title ? data.title : "Image does not Exist"}
            />
            <figcaption id="title">{data.title}</figcaption>
            <figcaption id="subtitle">{data.subtitle}</figcaption>
          </figure>
          <hr />
          <div id="spans">
            {data.tags ? (
              data.tags.map((tag: string) => {
                return (
                  <span key={uuidv4()} className="tags">
                    {tag}
                  </span>
                );
              })
            ) : (
              <span></span>
            )}
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Product;
