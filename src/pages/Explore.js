import React, {useCallback, useEffect, useState} from "react";
import CardList from "../components/CardList";
import '../styles/Explore.css';
import PageHeader from "../components/PageHeader";
import ExploreSearch from "../components/ExploreSearch";


const Explore = () => {
    const [searchData, setSearchData] = useState("");

    const onChangeOption = useCallback((e) => {
        setSearchData(e.target.value);
        /*console.log(searchData);*/
    }, [searchData]);

  return (
    <div id="explore">
    <PageHeader pageText={"EXPLORE"}/>
      <ExploreSearch option={searchData} changeOption={onChangeOption}/>
      <div id="list-container">
        <CardList data={searchData}/>
      </div>
    </div>
  );
};

export default Explore;
