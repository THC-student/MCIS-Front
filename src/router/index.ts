import { createRouter, createWebHashHistory } from "vue-router";

import Home from '../MainComponent/Home.vue';
import PersonalCenter from '../MainComponent/PersonalCenter.vue';
import ImageDetection from "../MainComponent/ImageDetection.vue";
import Feedback from '../MainComponent/Feedback.vue'
import HistoricalData from '../MainComponent/HistoricalData.vue'
import ErrorEscalation from "../MainComponent/FeedbackComponent/ErrorEscalation.vue";
import ProblemEscalation from "../MainComponent/FeedbackComponent/ProblemEscalation.vue";
import Login from "../loginAndRegister/Login.vue";
import Register from "../loginAndRegister/Register.vue";
import AppMain from '@/AppMain.vue'
import Details from "@/MainComponent/HistoryDataComponent/Details.vue";
import ManageUser from "@/RulerComponent/ManageUser.vue";
import Detection from '@/RulerComponent/Detection.vue'
import ManagePerson from "../RulerComponent/ManagePerson.vue";
import DataList from "../RulerComponent/DataList.vue";
import ManageUserFeedback from "../RulerComponent/ManageUserFeedback.vue";
import ManageReport from "../RulerComponent/ManageReport.vue";
import ManageOfficeData from "../RulerComponent/ManageOfficeData.vue";
import ViewUser from "../MainComponent/PersonalCenterComponent/ViewUser.vue";
import UserDetectionData from "../RulerComponent/UserDetectionData.vue";

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/Register',
        name: 'Register',
        component: Register
    },
    {
        path: '/AppMain',
        component: AppMain,
        children: [
            {
                path: '',
                name: 'Home',
                component: Home,
            },
            {
                path: 'PersonalCenter',
                name: 'PersonalCenter',
                component: PersonalCenter,
            },
            {
                path: 'ImageDetection',
                name: 'ImageDetection',
                component: ImageDetection,
            },
            {
                path: 'Feedback',
                name: 'Feedback',
                component: Feedback,
                children: [
                    {
                        path: '',
                        name: 'ErrorEscalation',
                        component: ErrorEscalation,
                    },
                    {
                        path: 'ErrorEscalation',
                        name: 'ErrorEscalation',
                        component: ErrorEscalation,
                    },
                    {
                        path: 'ProblemEscalation',
                        name: 'ProblemEscalation',
                        component: ProblemEscalation,
                    }
                ]
            },
            {
                path: 'HistoricalData',
                name: 'HistoricalData',
                component: HistoricalData,
            },
            {
                path: 'ManageUser',
                name: 'ManageUser',
                component: ManageUser,
            },
            {
                path: 'Detection',
                name: 'Detection',
                component: Detection,
            },
            {
                path: 'details',
                name: 'details',
                props: (route)=>({id:route.query.queryId}),
                component: Details,
            },
            {
                path: 'ManagePerson',
                name: 'ManagePerson',
                component: ManagePerson,
            },
            {
                path: 'DataList',
                name: 'DataList',
                component:DataList,
            },
            {
                path:'ManageUserFeedback',
                name:'ManageUserFeedback',
                component:ManageUserFeedback,
            },
            {
                path:'ManageReport',
                name:'ManageReport',
                component:ManageReport,
            },
            {
                path:'ManageOfficeData',
                name:'ManageOfficeData',
                component:ManageOfficeData,
            },
            {
                path: 'ViewUser',
                name: 'viewuser',
                props: (route)=>({id:route.query.id}),
                component: ViewUser,
            },
            {
                path:'UserDetectionData',
                name:'UserDetectionData',
                component:UserDetectionData,
            },
        ]
    },
];
const router = createRouter({
    history: createWebHashHistory(),
    mode:'history',
    routes
});
export default router
