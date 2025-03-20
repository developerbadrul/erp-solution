import CountryTable from '../components/CountryTable';

const dashboardRouts = [
    {
        title: 'Dashboard',
        path: '',
        element: <p>Element Will be here</p>, 
    },
    {
        title: 'Users Management',
        path: 'users',
        element: <p>Element Will be here</p>,
    },
    {
        title: 'Donation Management',
        path: 'donations',
        element: <p>Element Will be here</p>,
    },
    {
        title: 'Content Management',
        path: 'content',
        element: <p>Element Will be here</p>,
    },
    {
        title: 'Create Blog',
        path: 'blog',
        element: <p>Element Will be here</p>,
    },
    {
        title: 'Countries',
        path: 'countries',
        element: <CountryTable />,
    },
    {
        title: 'States',
        path: 'states',
        element: <p>Element Will be here</p>,
    },
];

export default dashboardRouts;
