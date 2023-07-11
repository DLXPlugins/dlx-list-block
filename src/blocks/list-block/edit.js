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

const ListBlock = ( props ) => {
const generatedUniqueId = useInstanceId( ListBlock, 'dlx-list-block' );

// Get the default prop shortcuts.
const { attributes, setAttributes, isSelected, clientId } = props;

// Extract out the attributes.
const {
	uniqueId,
	listType,
} = attributes;

// Set a reference to the innerBlocks.
const [ innerBlocksRef, setInnerBlocksRef ] = useState( null );

	// Set block props.
	const blockProps = useBlockProps(
		{
			className: 'dlx-list-block',
		}
	);

	// Set InnerBlock props.
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'dlx-list-block__inner',
			ref: setInnerBlocksRef,
		},
		{
			template: [
				[ 'dlxplugins/dlx-list-item-block' ],
				[ 'dlxplugins/dlx-list-item-block' ],
				[ 'dlxplugins/dlx-list-item-block' ],
			],
			allowedBlocks: [ 'dlxplugins/dlx-list-item-block' ],
			templateLock: false,
			renderAppender: InnerBlocks.DefaultBlockAppender,
		}
	);

	/**
	 * Generate Unique ID for the block instance.
	 */
	useEffect( () => {
		setAttributes( { uniqueId: generatedUniqueId } );
	}, [] );
			
	return (
		<section { ...blockProps }>
			<div id={ uniqueId } className="dlx-list-block__inner">
				<div className="dlx-list-block-title">
					{ __('DLX List Block', 'dlx-list-block' ) }
				</div>
				<ul>
					<div { ...innerBlocksProps } />
				</ul>
			</div>
		</section>
	);
};
export default ListBlock;