import React, {useCallback, useState} from "react";
import MyPageList from "../components/MyPageList";
import "../styles/Home.css";

import PageHeader from "../components/PageHeader";
import ExploreSearch from "../components/ExploreSearch";



const MyPage = () => {
    const [searchMyData, setSearchMyData] = useState("");

    const onChangeOption = useCallback((e) => {
        setSearchMyData(e.target.value);
        console.log(searchMyData);
    }, [searchMyData]);

    return (
        <div id="home">
            {/*<Header />*/}
            <PageHeader pageText={"My Collection"}/>
            <ExploreSearch option={searchMyData} changeOption={onChangeOption}/>
            <div id="list-container">
                <MyPageList data={searchMyData}/>
            </div>
        </div>
    );
};

export default MyPage;