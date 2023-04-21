import React, { memo, useState } from "react";
import NftCard from "./NftCard";

//react functional component
const ColumnNewRedux = ({
  showLoadMore = true,
  nfts = [],
  selectedNfts = [],
  setSelectedNfts,
  loading,
  onClick,
}) => {
  const [height, setHeight] = useState(0);

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  const onSelectNFT = (nft) => {
    // cannot merge legendary token
    if (nft?.tier === 3) return;
    if (isNFTSelected(nft?._id)) {
      setSelectedNfts(selectedNfts.filter((item) => item._id !== nft?._id));
      return;
    }
    if (selectedNfts.length === 0) {
      setSelectedNfts([nft]);
    } else {
      if (selectedNfts?.[0]?.tier === nft?.tier && selectedNfts?.length < 2)
        setSelectedNfts([...selectedNfts, nft]);
    }
  };

  const isNFTSelected = (id) =>
    selectedNfts.findIndex((item) => item._id === id) + 1;

  return (
    <div className="row" style={{ pointerEvents: loading ? "none" : "auto" }}>
      {nfts &&
        nfts.map((nft, index) => (
          <NftCard
            nft={nft}
            key={index}
            onImgLoad={onImgLoad}
            height={height}
            onClick={() => {
              if (onClick) {
                onClick(nft);
              } else {
                onSelectNFT(nft);
              }
            }}
            isSelected={isNFTSelected(nft._id)}
          />
        ))}
      {showLoadMore && nfts.length <= 20 && (
        <div className="col-lg-12">
          <div className="spacer-single"></div>
          <span onClick={() => {}} className="btn-main lead m-auto">
            Load More
          </span>
        </div>
      )}
    </div>
  );
};

export default memo(ColumnNewRedux);
