import sys

from mercurial import hg, node, ui


def main():
    """print (possibly remote) heads

    Prints a series of lines consisting of hashes and branch names.
    Specify a local or remote repository, defaulting to the configured remote.
    """   
    repo = sys.argv[1]
    
    other = hg.peer(ui.ui(), {}, repo)
    
    for tag, heads in other.branchmap().iteritems():
        print "%s %s" % (node.short(heads[0]), tag)

        
if __name__ == "__main__":
    main()
