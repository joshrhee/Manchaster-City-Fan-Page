import React, { useState, useEffect } from 'react';
import PlayerCard from '../Utils/PlayerCard';
import { Slide } from 'react-awesome-reveal';
import { Promise } from 'core-js';

import { showToastError } from '../Utils/tools';
import { CircularProgress } from '@material-ui/core';
import { firebase, playersCollection } from '../../firebase'

const TheTeam = () => {
    const [loading, setLoading] = useState(true);
    const [players, setPlayers] = useState(null);

    useEffect(() => {
        if (!players) {
            playersCollection
            .get()
            .then(snapshot => {
                const playersList = snapshot.docs.map( doc => ({
                    id: doc.id, ...doc.data()
                }));

                let promises = []

                playersList.forEach((player, idx) => {
                    promises.push(
                        new Promise((resolve, reject) => {
                            firebase.storage().ref('players')
                            .child(player.image).getDownloadURL()
                            .then(url => {
                                playersList[idx].url = url;
                                resolve();
                            }).catch(error => {
                                reject();
                            })
                        })
                    )
                });

                //all() makes to execute after all elements' of promises would be done for resolve or reject
                Promise.all(promises)
                .then(() => {
                    setPlayers(playersList);
                })

            }).catch(error => {
                showToastError('Sorry try again later');
            }).finally(() => {
                setLoading(false);
            })
        }
    }, [players]);

    const showPlayerByCategory = (category) => (
        players
            ?
                players.map((player, i) =>{
                    return player.position === category 
                        ?
                            <Slide left key={player.id} triggerOnce>
                                <div className="item">
                                    <PlayerCard
                                        number={player.number}
                                        name={player.name}
                                        lastname={player.lastname}
                                        bck={player.url}
                                    />
                                </div>
                            </Slide>
                        :
                            null
                })
            :
                null
    )

    return (
        <div className="the_team_container">
            {loading
                ?
                    <div className="progress">
                        <CircularProgress/>
                    </div>   
                :
                    <div>
                        <div className="team_category_wrapper">
                            <div className="title">Keepers</div>
                            <div className="team_cards">
                                {showPlayerByCategory('Keeper')}
                            </div>
                        </div>

                        <div className="team_category_wrapper">
                            <div className="title">Defence</div>
                            <div className="team_cards">
                                {showPlayerByCategory('Defence')}
                            </div>
                        </div>

                        <div className="team_category_wrapper">
                            <div className="title">Midfield</div>
                            <div className="team_cards">
                                {showPlayerByCategory('Midfield')}
                            </div>
                        </div>

                        <div className="team_category_wrapper">
                            <div className="title">Strikers</div>
                            <div className="team_cards">
                                {showPlayerByCategory('Striker')}
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default TheTeam;