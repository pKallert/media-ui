import * as React from 'react';
import Lightbox from 'react-image-lightbox';
import { useMediaUi, useMediaUiTheme } from '../core';

const useStyles = createUseMediaUiStyles((theme: MediaUiTheme) => ({
    preview: {
        gridArea: props => props.gridPosition,
        position: 'relative',
        '& figure': {
            textAlign: 'center',
            '& picture': {
                display: 'inline-block'
            }
        }
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: '.5rem',
        cursor: 'pointer'
    }
}));

export default function AssetPreview(props: GridComponentProps) {
    const classes = useStyles({ ...props });
    const { selectedAsset, setSelectedAsset } = useMediaUi();
    const { translate } = useIntl();

    return (
        <section className={classes.preview}>
            {translate('preview.header', `Preview for ${selectedAsset.label}`, [selectedAsset.label])}
            <a
                className={classes.closeButton}
                onClick={() => setSelectedAsset(null)}
                title={translate('preview.close', 'Close preview')}
            >
                <Icon icon="times-circle" />
            </a>
            <figure>
                <picture>
                    <img src={selectedAsset.previewUri} alt={selectedAsset.label} />
                </picture>
            </figure>
        </section>
    );
}
