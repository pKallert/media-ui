import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Tree from '@neos-project/react-ui-components/lib-esm/Tree';
import { createUseMediaUiStyles, useMediaUi, useIntl } from '../../../core';
import { useAssetSourceFilter } from '../../../hooks';
import { MediaUiTheme } from '../../../interfaces';
import AssetCollectionTreeNode from './AssetCollectionTreeNode';
import TagTreeNode from './TagTreeNode';
import IconButton from '@neos-project/react-ui-components/lib-esm/IconButton';
import Icon from '@neos-project/react-ui-components/lib-esm/Icon';

const useStyles = createUseMediaUiStyles((theme: MediaUiTheme) => ({
    container: {
        '.neos &': {
            border: `1px solid ${theme.colors.contrastDark}`
        }
    },
    iconWrap: {
        width: theme.spacing.goldenUnit,
        display: 'inline-flex',
        justifyContent: 'center'
    },
    headline: {
        '.neos &': {
            fontWeight: 'bold',
            lineHeight: theme.spacing.goldenUnit,
            paddingLeft: theme.spacing.half
        }
    },
    toolbar: {
        borderTop: `1px solid ${theme.colors.contrastDark}`
    },
    tree: {
        borderTop: `1px solid ${theme.colors.contrastDark}`
    }
}));

const AssetCollectionTree = () => {
    const classes = useStyles();
    const { translate } = useIntl();
    const {
        assetCollections,
        assetCollectionFilter,
        setAssetCollectionFilter,
        assetSources,
        tagFilter,
        setTagFilter,
        tags,
        notify
    } = useMediaUi();
    const [assetSourceFilter] = useAssetSourceFilter();

    const selectedAssetSource = assetSources.find(assetSource => assetSource.identifier === assetSourceFilter);

    const onClickAdd = () => {
        notify('info', 'This feature has not been implemented yet');
    };

    return (
        <>
            {selectedAssetSource?.supportsCollections && (
                <nav className={classes.container}>
                    <div>
                        <span className={classes.iconWrap}>
                            <Icon icon="folder" />
                        </span>
                        <span className={classes.headline}>
                            {translate('assetCollectionList.header', 'Collections')}
                        </span>
                    </div>

                    <div className={classes.toolbar}>
                        <IconButton
                            icon="plus"
                            size="regular"
                            style="transparent"
                            hoverStyle="brand"
                            disabled={!assetCollectionFilter && !tagFilter}
                            title={translate('assetCollectionTree.toolbar.create', 'Create new')}
                            onClick={() => onClickAdd()}
                        />
                        <IconButton
                            icon="trash-alt"
                            size="regular"
                            style="transparent"
                            hoverStyle="brand"
                            disabled={!assetCollectionFilter && !tagFilter}
                            title={translate('assetCollectionTree.toolbar.delete', 'Delete')}
                            onClick={() => onClickAdd()}
                        />
                    </div>

                    <Tree className={classes.tree}>
                        <AssetCollectionTreeNode
                            isActive={!assetCollectionFilter && !tagFilter}
                            label={translate('assetCollectionList.showAll', 'All')}
                            title={translate('assetCollectionList.showAll.title', 'Show assets for all collections')}
                            level={1}
                            onClick={() => {
                                setAssetCollectionFilter(null);
                                setTagFilter(null);
                            }}
                            assetCollection={null}
                        >
                            {tags?.map(tag => (
                                <TagTreeNode
                                    key={tag.label}
                                    tag={tag}
                                    isActive={!assetCollectionFilter && tag.label == tagFilter?.label}
                                    level={2}
                                    onClick={() => {
                                        setAssetCollectionFilter(null);
                                        setTagFilter(tag);
                                    }}
                                />
                            ))}
                        </AssetCollectionTreeNode>
                        {assetCollections.map((assetCollection, index) => (
                            <AssetCollectionTreeNode
                                key={index}
                                assetCollection={assetCollection}
                                onClick={() => {
                                    setAssetCollectionFilter(assetCollection);
                                    setTagFilter(null);
                                }}
                                level={1}
                                isActive={assetCollection.title == assetCollectionFilter?.title && !tagFilter}
                            >
                                {assetCollection.tags?.map(tag => (
                                    <TagTreeNode
                                        key={tag.label}
                                        tag={tag}
                                        isActive={
                                            assetCollection.title == assetCollectionFilter?.title &&
                                            tag.label == tagFilter?.label
                                        }
                                        level={2}
                                        onClick={() => {
                                            setAssetCollectionFilter(assetCollection);
                                            setTagFilter(tag);
                                        }}
                                    />
                                ))}
                            </AssetCollectionTreeNode>
                        ))}
                    </Tree>
                </nav>
            )}
        </>
    );
};

const withDragDropContext = DragDropContext(HTML5Backend);
export default withDragDropContext(AssetCollectionTree);