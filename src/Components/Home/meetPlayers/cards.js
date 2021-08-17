import React from 'react';
import { easePolyOut } from 'd3-ease';
import { Animate } from 'react-move';

import Otamendi from '../../../Resources/images/players/Otamendi.png';
import Sterling from '../../../Resources/images/players/Raheem_Sterling.png';
import Kompany from '../../../Resources/images/players/Vincent_Kompany.png';
import Debruyne from '../../../Resources/images/players/kevin_de_bruyne.png';
import PlayerCard from '../../Utils/PlayerCard';

let cards = [
    {
        bottom:90,
        left:300,
        player:Kompany
    },
    {
        bottom:60,
        left:200,
        player:Sterling
    },
    {
        bottom:30,
        left:100,
        player:Otamendi
    },
    {
        bottom:0,
        left:0,
        player:Debruyne
    }
]

const HomeCards = (props) => {

    const showAnimateCards = () => (
        cards.map((card, i) => (
            <Animate
                key={i}
                show={props.show}
                start={{
                    left:0,
                    bottom:0
                }}
                enter={{
                    left:[card.left],
                    bottom:[card.bottom],
                    timing:{ delay:500, duration: 500, ease:easePolyOut }
                }}
            >
                {({left, bottom}) => (
                    <div
                        style={{
                            position:'absolute',
                            left,
                            bottom
                        }}
                    >
                        <PlayerCard
                            number="17"
                            name="Kevin"
                            lastname="Debruyne"
                            bck={card.player}
                        />
                    </div>
                )}
            </Animate>
        ))
    )

    return (
        <div>
            {showAnimateCards()}
        </div>
    );
};

export default HomeCards;