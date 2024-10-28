import React, { useEffect, useState } from 'react';
import { Table} from 'antd';
import { View, Text, StyleSheet } from 'react-native';
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <button onClick={() => navigation.navigate('show_info_driver', { worker: record })} style={{ marginRight: 10 }}>
                +
            </button>
            <button onClick={() => navigation.navigate('show_info_driver', { worker: record })}>
                location
            </button>
            </View>
            ),
        },
    ];

    return (
        <Table
            dataSource={chauffeurs}
            columns={columns}
            rowKey="id"
            pagination={false}  // Disable pagination here
            scroll={{ y: 400 }}  // Enable scrolling for large lists
        />
    );
};

export default ChauffeursList;
