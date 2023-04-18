import React, { memo, useState } from "react";
import NftCard from "./NftCard";
import NftMusicCard from "./NftMusicCard";

//react functional component
const ColumnNewRedux = ({
  showLoadMore = true,
  shuffle = false,
  authorId = null,
  nfts = [],
  selectedNfts,
  setSelectedNfts,
}) => {
  const [height, setHeight] = useState(0);

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  const onSelectNFT = (nft) => {
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
    [selectedNfts?.[0]?._id, selectedNfts?.[1]?._id].includes(id);

  return (
    <div className="row">
      {nfts &&
        nfts.map((nft, index) =>
          nft.category === "music" ? (
            <NftMusicCard
              nft={nft}
              audioUrl={nft.audio_url}
              key={index}
              onImgLoad={onImgLoad}
              height={height}
            />
          ) : (
            <NftCard
              nft={nft}
              key={index}
              onImgLoad={onImgLoad}
              height={height}
              onClick={() => {
                onSelectNFT(nft);
              }}
              isSelected={isNFTSelected(nft._id)}
            />
          )
        )}
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
