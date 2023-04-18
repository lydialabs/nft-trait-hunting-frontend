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
        }}
      >
        {/* {nft.item_type === "single_items" ? (
          <div className="icontype">
            <i className="fa fa-bookmark"></i>
          </div>
        ) : (
          <div className="icontype">
            <i className="fa fa-shopping-basket"></i>
          </div>
        )} */}
        {nft.deadline && clockTop && (
          <div className="de_countdown">
            <Clock deadline={nft.deadline} />
          </div>
        )}
        {/* <div className="author_list_pp">
                    <span onClick={()=> navigateTo(nft.author_link)}>                                    
                        <img className="lazy" src={nft.image} alt=""/>
                        <i className="fa fa-check"></i>
                    </span>
                </div> */}
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
          {/* <div className="nft__item_action">
            <span onClick={() => navigateTo(`${nft.bid_link}/${nft.id}`)}>
              {nft.status === "on_auction" ? "Place a bid" : "Buy Now"}
            </span>
          </div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{nft.likes}</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default memo(NftCard);
