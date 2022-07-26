import type { NextPage } from 'next'
import styles from '../src/styles/Home.module.scss'
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getAuthors, getStories } from "../src/services/requests";
import { useQuery } from "react-query"
import { CardComponent } from '../src/components/Card/Card';
import { StoryComponent } from '../src/components/StoryComponent/StoryComponent';
import { AuthorInfoComponent } from '../src/components/AuthorInfo/AuthorInfo';
import { Story } from '../src/utils/types';

const  AllNewsComponent: NextPage = () => {
    const {data, isLoading} = useQuery(["topStories"], () => getStories());
    const authors = useQuery(["authors"], () => getAuthors());
    const [sorted, setSorted] = useState(data);

    const sortByScoreAsc = useCallback((data: any) => {
        const newSorted = data?.slice().sort((a: any, b: any) => a.score - b.score);
        setSorted(newSorted);
    }, []);
    
    useEffect(()=>{
       sortByScoreAsc(data);
    },[sortByScoreAsc, data])

    if(isLoading) {return <div>Loading data...</div>}
    return (
        <div>
            <h2 className={styles.theTitle}>HackerNews Challenge</h2>
            <div className={styles.homeContainer}>
                {sorted?.map((item: Story, index: any) => 
                <CardComponent key={index}>
                    <StoryComponent story={item}>
                    {authors.data?.map((user, index) => {
                        if(user.id === item.by){return <AuthorInfoComponent key={index} user={user} storyURL={item.url} />}
                    })}
                    </StoryComponent>
                </CardComponent>)}
            </div>
        </div>
    );
};

export default AllNewsComponent;