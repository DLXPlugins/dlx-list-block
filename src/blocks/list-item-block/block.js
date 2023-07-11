import metadata from './block.json';
import { useInnerBlocksProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import Edit from './edit';

registerBlockType( metadata, {
	edit: Edit,
	save: () => {
		return useInnerBlocksProps.save();
	},
} );
