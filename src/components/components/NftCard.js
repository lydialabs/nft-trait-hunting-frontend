import React, { memo } from "react";
import styled from "styled-components";
import Clock from "./Clock";
import { useNavigate } from "react-router-dom";

import { TIERS } from "../../core/wallet/constants";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

//react functional component
const NftCard = ({
  nft,
  className = "d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4",
  clockTop = true,
  height,
  onImgLoad,
  onClick,
  isSelected,
}) => {
  const navigate = useNavigate();
  const navigateTo = (link) => {
    navigate(link);
  };

  return (
    <div className={className} onClick={onClick}>
      <div
        className="nft__item m-0"
        style={{
          border: `solid 1px ${isSelected ? "#ff343f" : "transparent"}`,
          position: "relative",
        }}
      >
        {isSelected !== 0 && (
          <div
            className="index-mark"
            style={{
              width: "25px",
              height: "25px",
              lineHeight: "25px",
              backgroundColor: "#ff343f",
              textAlign: "center",
              color: "white",
              fontWeight: "bold",
              position: "absolute",
              top: 0,
              right: 0,
              borderTopRightRadius: "10px",
            }}
          >
            {isSelected}
          </div>
        )}
        {nft.deadline && clockTop && (
          <div className="de_countdown">
            <Clock deadline={nft.deadline} />
          </div>
        )}
        <div className="nft__item_wrap" style={{ height: `${height}px` }}>
          <Outer>
            <span>
              <img
                onLoad={onImgLoad}
                src={nft.image}
                className="lazy nft__item_preview"
                alt=""
              />
            </span>
          </Outer>
        </div>
        {nft.deadline && !clockTop && (
          <div className="de_countdown">
            <Clock deadline={nft.deadline} />
          </div>
        )}
        <div className="nft__item_info">
          <span onClick={() => navigateTo(`${nft.nft_link}/${nft.id}`)}>
            <h4>{nft.title}</h4>
          </span>
          {nft.status === "has_offers" ? (
            <div className="has_offers">
              <span className="through">{nft.priceover}</span> {nft.price} ETH
            </div>
          ) : (
            <div
              className="nft__item_price mb-3 text-uppercase"
              style={{ color: TIERS[nft.tier].color }}
            >
              {TIERS[nft.tier].label}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(NftCard);
