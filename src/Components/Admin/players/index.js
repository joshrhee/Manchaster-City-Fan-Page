import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../Hoc/AdminLayout';

import { playersCollection } from '../../../firebase';
import { 
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    CircularProgress
 } from '@material-ui/core';
import { showToastError } from '../../Utils/tools';

const AdminPlayers = () => {
    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(false);
    const [players, setPlayers] = useState(null);

    useEffect( () => {
        if (!players) {
            setLoading(true);
            playersCollection
            .limit(2)
            .get()
            .then(snapshot => {
                //Getting the last element of DB
                const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                const players = snapshot.docs.map(doc => ({
                    id:doc.id,
                    ...doc.data()
                }))

                setLastVisible(lastVisible);
                setPlayers(players);

            }).catch(error => {
                showToastError("AdminPlayers useEffect error: ", error);
            }).finally(()=> {
                //Finally will be executed either it comes from then() or catch()
                setLoading(false)
            })
        }
    }, [players])

    const loadMorePlayers = () => {
        if (lastVisible) {
            setLoading(true);
            playersCollection
            .startAfter(lastVisible)
            .limit(2)
            .get()
            .then(snapshot => {
                const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                const newPlayers = snapshot.docs.map( doc => ({
                    id:doc.id,
                    ...doc.data()
                }));

                setLastVisible(lastVisible);
                //Adding next two players from the original players list
                setPlayers([...players, ...newPlayers]);

            }).catch(error => {
                showToastError("AdminPlayers loadMorePlayers error: ", error);
            }).finally(() => {
                setLoading(false);
            })
        } else {
            showToastError("AdminPlayers: Nothing to load");
        }
    }

    return (
        <AdminLayout title="The players">
            <div className="mb-5">
                <Button
                    disableElevation
                    variant="outlined"
                    //If we don't have component={Link}, to={} will not work
                    component={Link}
                    to={'/admin_players/add_player'}
                >
                    Add player
                </Button>

            </div>

            <Paper className="mb-5">

                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell>First name</TableCell>
                            <TableCell>Last name</TableCell>
                            <TableCell>Number</TableCell>
                            <TableCell>Position</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {players
                        ?
                            players.map((player, i) => (
                                <TableRow key={player.id}>

                                    <TableCell>
                                        <Link to={`/admin_players/edit_player/${player.id}`}>
                                            {player.name}
                                        </Link>
                                    </TableCell>

                                    <TableCell>
                                        <Link to={`/admin_players/edit_player/${player.id}`}>
                                            {player.lastname}
                                        </Link>
                                    </TableCell>

                                    <TableCell>
                                        {player.number}
                                    </TableCell>

                                    <TableCell>
                                        {player.position}
                                    </TableCell>

                                </TableRow>
                            ))    
                        :
                            null
                        }
                    </TableBody>

                </Table>

            </Paper>

            <Button
                variant="contained"
                color="primary"
                onClick={() => {loadMorePlayers()}}
                disabled={loading}
            >
                Load more
            </Button>

            <div className="admin_progress">
                {loading
                ?
                    <CircularProgress 
                        thickness={7} 
                        style={{
                            color:'#98c5e9'
                        }}
                    />
                :
                    null
                }
            </div>

        </AdminLayout>
    );
};

export default AdminPlayers;