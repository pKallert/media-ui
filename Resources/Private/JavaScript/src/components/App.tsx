import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { SideBarLeft } from './SideBarLeft';
import { SideBarRight } from './SideBarRight';
import Pagination from './Pagination';
import { useMediaUi, createUseMediaUiStyles, MediaUiThemeProvider } from '../core';
import LoadingIndicator from './LoadingIndicator';
import { MediaUiTheme } from '../interfaces';
import { VIEW_MODE_SELECTION } from '../queries/ViewModeSelectionQuery';
import { TopBar } from './TopBar';
import { ThumbnailView, ListView } from './Main';
import { VIEW_MODES } from '../hooks';
import AssetPreview from './AssetPreview';

const useStyles = createUseMediaUiStyles((theme: MediaUiTheme) => ({
    container: {
        display: 'grid',
        gridTemplateColumns: '250px 1fr 250px',
        gridTemplateAreas: `
            "left top right"
            "left main right"
            "left bottom right"
        `,
        gridGap: '1rem'
    }
}));

export default function App() {
    const classes = useStyles();
    const { selectedAssetForPreview } = useMediaUi();

    const viewModeSelectionQuery = useQuery(VIEW_MODE_SELECTION);
    const { viewModeSelection } = viewModeSelectionQuery.data;

    return (
        <MediaUiThemeProvider>
            <div className={classes.container}>
                <LoadingIndicator />
                <SideBarLeft gridPosition="left" />
                <TopBar gridPosition="top" />
                {viewModeSelection === VIEW_MODES.List ? (
                    <ListView gridPosition="main" />
                ) : (
                    <ThumbnailView gridPosition="main" />
                )}
                <Pagination />
                <SideBarRight gridPosition="right" />

                {selectedAssetForPreview && <AssetPreview />}
            </div>
        </MediaUiThemeProvider>
    );
}