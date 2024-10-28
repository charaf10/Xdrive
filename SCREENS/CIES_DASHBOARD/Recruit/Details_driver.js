import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useNavigation } from '@react-navigation/native';
import {myip, mydbAPI} from '../../../IP';

const ChauffeursList = () => {
    const [chauffeurs, setChauffeurs] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchChauffeurs = async () => {
            const response = await fetch('http://' + myip + ':80/link/entreprise/get_alldrivers.php');
            const data = await response.json();
            setChauffeurs(data);
        };
        fetchChauffeurs();
    }, []);

    const columns = [
        { title: 'Nom', dataIndex: 'FullName', key: 'nom' },
        { title: 'Téléphone', dataIndex: 'PhoneNumber', key: 'telephone' },
        {
            title: 'Détails',
            key: 'details',
            render: (text, record) => (
                <button onClick={() => navigation.navigate('show_info_driver', { worker: record })}>
                    +
                </button>
            ),
        },
    ];

    return <Table dataSource={chauffeurs} columns={columns} rowKey="id" />;
};

export default ChauffeursList;
