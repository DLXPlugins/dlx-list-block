/**
 * Import CSS.
 */
import './editor.scss';

/**
 * Import block dependencies.
 */
import { useBlockProps, useInnerBlocksProps, InnerBlocks } from '@wordpress/block-editor';
import { useInstanceId } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const ListItemBlock = ( props ) => {
	const generatedUniqueId = useInstanceId( ListItemBlock, 'dlx-list-item-block' );

	const { attributes, setAttributes, isSelected, clientId } = props;
	const {
		uniqueId,
		textColor,
		backgroundColor,
	} = attributes;

	// Set up innerblock reference.
	const [ innerBlocksRef, setInnerBlocksRef ] = useState( null );

	// Set block props.
	const blockProps = useBlockProps(
		{
			className: 'dlx-list-item-block',
		}
	);

	// Set InnerBlock props.
	const innerBlocksProps = useInnerBlocksProps(
		{
			...blockProps,
			ref: setInnerBlocksRef
		},
		{
			template: [
				[ 'core/paragraph' ],
			],
			allowedBlocks: [ 'core/paragraph' ],
			templateLock: false,
			renderAppender: InnerBlocks.DefaultBlockAppender
		}
	);

	/**
	 * Generate Unique ID for the block instance.
	 */
	useEffect( () => {
		setAttributes( { uniqueId: generatedUniqueId } );
	}, [] );

	const combinedProps = {
		...blockProps,
		...innerBlocksProps,
	};
			
	return (
		<li id={ uniqueId } { ...combinedProps } />
	);
};
export default ListItemBlock;