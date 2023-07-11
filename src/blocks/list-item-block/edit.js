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

	// /**
	//  * Select the first paragraph block when first rendered.
	//  */
	// useEffect( () => {
	// 	if ( innerBlocksRef ) {
	// 		// Get the currently selected block.
	// 		const selectedBlock = wp.data.select( 'core/block-editor' ).getBlocks( clientId );

	// 		console.log( isSelected, clientId, selectedBlock );

	// 		// // Get ID attribute of paragraph.
	// 		// const firstParagraphId = firstParagraphBlock.getAttribute( 'data-block' );

	// 		// console.log( firstParagraphBlock );
	// 		// console.log( firstParagraphId );

	// 		// get data client id.
	// 		//firstParagraphClientId = wp.data.select( 'core/block-editor' ).selectBlock( firstParagraphId ).clientId;


			

	// 		// console.log( firstParagraphClientId );
	// 		// wp.data.dispatch( 'core/block-editor' ).selectBlock( firstParagraphBlock.id );
	// 	}
	// }, [ innerBlocksRef ] );

	const combinedProps = {
		...blockProps,
		...innerBlocksProps,
	};
			
	return (
		<li id={ uniqueId } { ...combinedProps } />
	);
};
export default ListItemBlock;