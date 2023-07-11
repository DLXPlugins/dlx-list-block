import metadata from './block.json';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import Edit from './edit';

registerBlockType( metadata, {
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
